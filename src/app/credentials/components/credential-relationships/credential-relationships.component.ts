import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ICredentialDef,
  ICredential,
  CredentialStateService,
} from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RelationshipsActionService } from 'src/app/relationships/services/relationships-action.service';
import { IRelationship } from 'src/app/messages/services/messages-state.service';
import { tap, map } from 'rxjs/operators';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';
import { RelationshipActionsService } from '../../services/relationship-actions.service';

@Component({
  selector: 'app-credential-relationships',
  template: `
    <ion-grid>
      <ion-row *ngIf="relationships | async as relationships">
        <ion-col>
          <ion-list>
            <ion-list-header class="ion-no-margin ion-no-padding">
              <div style="display: flex; width: 100%; flex-direction: column">
                <!-- TODO: This would be better in the title -->
                <span class="ion-padding" *ngIf="active$ | async as cred"
                  >Relationships with <strong>{{ cred.name }}</strong></span
                >
              </div>
            </ion-list-header>
            <ion-item-sliding *ngFor="let relationship of relationships">
              <ion-item (click)="presentActionSheet(relationship._id)">
                <ion-icon name="person" class="icon-lg"></ion-icon>
                <ion-label>
                  <h2>{{ relationship.name }}</h2>
                  <small>DID: {{ relationship.did }}</small>
                </ion-label>
                <ion-badge color="success" item-end
                  ><ion-icon name="checkmark" class="icon-md"></ion-icon
                ></ion-badge>
              </ion-item>
            </ion-item-sliding>
          </ion-list>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styleUrls: ['./credential-relationships.component.scss'],
})
export class CredentialRelationshipsComponent implements OnInit {
  active$: Observable<ICredentialDef>;
  relationships: Observable<IRelationship[]>;
  fg: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public relationShipActionService: RelationshipActionsService,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
  ) {
    this.active$ = this.actionSvc.getCredential(
      this.route.snapshot.paramMap.get('id'),
    );
  }

  ngOnInit() {
    this.relationships = this.relationShipActionService.getRelationshipByState(
      'active',
    );

    const fg = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.fg = fg;
  }

  async presentActionSheet(relationshipId: any) {
    const credentialId = this.route.snapshot.paramMap.get('id');

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Relationship',
          handler: () => {
            this.router.navigate([`/relationships/view/${relationshipId}`]);
          },
        },
        {
          text: 'View Credential Details',
          handler: () => {
            this.router.navigate([`/credentials/view/${credentialId}`], {
              queryParams: { rId: relationshipId },
            });
          },
        },
        {
          text: 'Disable Credential',
          role: 'destructive',
          handler: () => {
            // this.router.navigate([`/credentials/revoke/${this._id}`]);
          },
        },
        /*{
          text: 'View All Credentials',
          handler: () => {
            this.router.navigate([`/credentials`]);
          }
        },*/
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
