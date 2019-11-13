import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import {
  RelationshipsStateService,
  IRelationship,
} from '../../services/relationships-state.service';
import { RelationshipsActionService } from '../../services/relationships-action.service';
import { HttpService } from 'src/app/core/services/http.service';
import { map, tap, take } from 'rxjs/operators';
import { IRawRel } from 'src/app/core/interfaces/raw-rel.interface';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-view-relationship',
  template: `
    <ng-container *ngIf="active | async as rel">
      <app-item-header default="/relationships" title="Relationship">
      </app-item-header>
      <ion-content>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-card text-center>
                <ion-toolbar color="primary">
                  <ion-title>{{ rel.name }}</ion-title>
                  <ion-sub-title>Their DID: {{ rel.did }}</ion-sub-title>
                </ion-toolbar>

                <ion-list>
                  <!--<ion-item class="flex ion-justify-content-around">
                  <ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>
                  <ion-label>Date Connected</ion-label>
                  <ion-badge color="medium" item-end>{{
                    relationship.created
                  }}</ion-badge>
                </ion-item>-->

                  <ion-item
                    class="flex ion-justify-content-around"
                    lines="none"
                  >
                    <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                    <ion-label>Status</ion-label>
                    <ion-badge color="success" item-end>{{
                      rel.state
                    }}</ion-badge>
                  </ion-item>
                  <!--
                  <ion-item
                    button
                    class="flex ion-justify-content-around"
                    (click)="this.router.navigate(['/credentials/received'])"
                  >
                    <ion-label>
                      <h2>Credentials Shared</h2>
                    </ion-label>
                    <ion-badge color="medium" item-end>4</ion-badge>
                  </ion-item>
                  <ion-item
                    button
                    class="flex ion-justify-content-around"
                    (click)="this.router.navigate(['/verify-credentials'])"
                  >
                    <ion-label>
                      <h2>Proof Certificates</h2>
                    </ion-label>
                    <ion-badge color="medium" item-end>2</ion-badge>
                  </ion-item>
                  -->
                  <ng-container *ngIf="$all | async as all">
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label class="flex ion-align-items-center">
                          <ion-icon
                            class="icon-md"
                            name="notifications"
                          ></ion-icon
                          >&nbsp;&nbsp;&nbsp;<span>Action Required</span>
                        </ion-label>
                      </ion-item-divider>
                      <ion-item
                        button
                        *ngIf="stateSvc.isProver || stateSvc.isIssuer"
                        class="flex ion-justify-content-around"
                        (click)="navigate()"
                      >
                        <ion-label>
                          <h2>Credentials In Progress</h2>
                        </ion-label>
                        <ion-badge color="primary" item-end>{{
                          all.issues.length
                        }}</ion-badge>
                      </ion-item>
                      <ion-item
                        button
                        class="flex ion-justify-content-around"
                        *ngIf="stateSvc.isProver || stateSvc.isVerifier"
                        class="flex ion-justify-content-around"
                        (click)="
                          this.router.navigate([
                            '/credentials/verify-credentials'
                          ])
                        "
                      >
                        <ion-label>
                          <h2>Provide Proof</h2>
                        </ion-label>
                        <ion-badge color="medium" item-end>{{
                          all.proofs.length
                        }}</ion-badge>
                      </ion-item>
                    </ion-item-group>
                    <ion-item-divider>
                      <ion-label class="flex ion-align-items-center">
                        <ion-icon class="icon-md" name="person"></ion-icon
                        >&nbsp;&nbsp;&nbsp;<span>Values</span>
                      </ion-label>
                    </ion-item-divider>
                    <ng-container *ngIf="$fields | async as fields">
                      <app-list-item
                        *ngFor="let field of fields"
                        [label]="field.key"
                        [value]="field.value"
                      >
                      </app-list-item>
                    </ng-container>
                  </ng-container>
                </ion-list>

                <div style="display: flex">
                  <ion-button
                    style="flex: 1"
                    color="danger"
                    outline
                    full
                    icon-start
                    margin
                    (click)="delete()"
                  >
                    <ion-icon name="trash"></ion-icon>
                    Delete
                  </ion-button>
                </div>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ng-container>
  `,
  styleUrls: ['./view-relationship.component.scss'],
})
export class ViewRelationshipComponent implements OnInit, OnDestroy {
  active: Observable<any>;
  $all: Observable<IRawRel>;
  _id: string;
  $fields: Observable<{ key: string; value: any }[]>;
  navigate() {
    this.stateSvc.isProver
      ? this.router.navigate(['/credentials/received'])
      : this.router.navigate(['/issuer/manage']);
  }
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public stateSvc: StateService,
    private actionSvc: RelationshipsActionService,
    private httpSvc: HttpService,
    private relActionSvc: RelationshipsActionService,
  ) {}

  ngOnInit() {
    this.active = this.actionSvc
      .getRelationshipById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap(obs => {
          this._id = obs._id;
        }),
      );
    this.$all = this.actionSvc.getRawRelationship(
      this.route.snapshot.paramMap.get('id'),
    );
    // .pipe(tap(res => (this.active = of(res.relationship))));
    this.$fields = this.$all.pipe(
      map(obs => {
        const keys = Object.keys(obs.relationship);
        console.log(obs);
        return keys.map(key => ({ key, value: obs.relationship[key] }));
      }),
      tap(obs => console.log(obs)),
    );
  }

  async ngOnDestroy() {
    return await this.actionSvc.resetRelState();
  }

  async delete() {
    const res = await this.httpSvc
      .delete('relationships', this._id)
      .toPromise();
    if (res) {
      await this.actionSvc.resetRelState();
      setTimeout(() => this.router.navigate(['/relationships']), 500);
    }
  }
}
