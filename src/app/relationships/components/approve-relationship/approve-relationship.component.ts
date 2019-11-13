import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import {
  RelationshipsStateService,
  IRelationship,
} from '../../services/relationships-state.service';
import { RelationshipsActionService } from '../../services/relationships-action.service';
import { HttpService } from 'src/app/core/services/http.service';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-approve-relationship',
  template: `
    <app-item-header title="Approve Relationship" default="/relationships">
    </app-item-header>
    <ion-content *ngIf="active | async as relationship">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card text-center>
              <ion-toolbar color="primary">
                <ion-title>{{ relationship.name }}</ion-title>
                <ion-buttons slot="secondary">
                  <ion-button (click)="decline(relationship._id)" size="large">
                    <ion-label>Decline</ion-label>
                    <ion-icon name="trash" slot="start"></ion-icon>
                  </ion-button>
                </ion-buttons>
                <ion-buttons slot="primary">
                  <ion-button (click)="accept(relationship._id)" size="large">
                    <ion-label>Accept</ion-label>
                    <ion-icon name="checkmark"></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>

              <ion-list>
                <ion-item class="flex ion-justify-content-around">
                  <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                  <ion-label>Invitiation Sent</ion-label>
                  <ion-badge color="medium" item-end>{{
                    relationship.created
                  }}</ion-badge>
                </ion-item>

                <ion-item class="flex ion-justify-content-around" lines="none">
                  <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                  <ion-label>Status</ion-label>
                  <ion-badge color="medium" item-end>{{
                    relationship.state
                  }}</ion-badge>
                </ion-item>
                <ng-container *ngIf="$fields | async as fields">
                  <app-list-item
                    *ngFor="let field of fields"
                    [label]="field.key"
                    [value]="field.value"
                  >
                  </app-list-item>
                </ng-container>
              </ion-list>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./approve-relationship.component.scss'],
})
export class ApproveRelationshipComponent implements OnInit, OnDestroy {
  graduationDate: string = new Date().toDateString();
  active: Observable<IRelationship>;
  $fields: Observable<{ key: string; value: any }[]>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private actionSvc: RelationshipsActionService,
    private httpSvc: HttpService,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.active = this.actionSvc.getRelationshipById(
      this.route.snapshot.paramMap.get('id'),
    );

    this.$fields = this.actionSvc
      .getRawRelationship(this.route.snapshot.paramMap.get('id'))
      .pipe(
        map(obs => {
          const keys = Object.keys(obs.relationship);
          return keys.map(key => ({ key, value: obs.relationship[key] }));
        }),
      );
  }

  async ngOnDestroy() {
    return await this.actionSvc.resetRelState();
  }

  async accept(id: string) {
    const res = await this.httpSvc.postById('relationships', id).toPromise();
    console.log(res);
    if (res) {
      const loading = await this.loadingController.create({
        message: 'Accepting relationship',
        duration: 10000,
      });
      await loading.present();
      setTimeout(
        () =>
          this.actionSvc.resetRelState().then(() => {
            loading.dismiss().then(() => {
              this.router.navigate(['/relationships/view/' + id]);
            });
          }),
        3000,
      );
    }
  }

  async decline(id: string) {
    const res = await this.httpSvc.delete<any>('relationships', id).toPromise();
    console.log('res', res);
    if (res) {
      const loading = await this.loadingController.create({
        message: 'Declining relationship',
        duration: 10000,
      });
      await loading.present();
      setTimeout(
        () =>
          this.actionSvc.resetRelState().then(() => {
            loading.dismiss().then(() => {
              this.router.navigate(['/relationships/']);
            });
          }),
        3000,
      );
    }
  }
}
