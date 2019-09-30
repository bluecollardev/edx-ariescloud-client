import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CredentialStateService,
  ICertificateOfProof,
  ICredential,
  IIssuer
} from '../../../credentials/services/credential-state.service';
import { RelationshipsStateService, IRelationship } from '../../../relationships/services/relationships-state.service';
import { CredentialActionsService } from '../../../credentials/services/credential-actions.service';
import { RelationshipsActionService } from '../../../relationships/services/relationships-action.service';

@Component({
  selector: 'app-credentials',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Certificates of Proof</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row *ngIf="stateSvc.certificatesOfProof$ | async as certificates">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-grid style="width: 100%;">
              <ion-row *ngIf="stateSvc.certificatesOfProof$ | async as certificates">
                <ion-col
                  *ngFor="let certificate of certificates"
                  sizeXs="6"
                  sizeSm="4"
                  sizeMd="3"
                  sizeLg="2"
                >
                  <ion-card text-center (click)="presentActionSheet(certificate.id)">
                    <ion-card-header>
                      {{ certificate.issuedTo }}
                    </ion-card-header>
                    <ion-icon name="document" class="icon-lg"></ion-icon>
                    <ion-card-content>
                      <small><strong>{{  certificate.name }}</strong></small>
                      <br/>
                      <small>{{ certificate.issuedBy }}</small>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
            <div class="ion-padding">
              <ion-button
                expand="block"
                class="ion-no-margin">
                <ion-icon name="send"></ion-icon>
                Request Certificate of Proof
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./relationship-proofs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationshipProofsComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredential[]>;
  relationships: Observable<IRelationship[]>;
  issuers: Observable<IIssuer[]>;
  proofs: Observable<ICertificateOfProof[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public stateSvc: CredentialStateService,
    public relationshipStateSvc: RelationshipsStateService,
    private actionSvc: CredentialActionsService,
    private relationshipActionSvc: RelationshipsActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {
    this.initializeItems();
  }

  ngOnInit() {
    this.stateSvc.ready.subscribe(bool => {
      console.log('subscribing to service observables');
      // console.log('bool', bool);
      if (bool) {
        this.credentials = this.stateSvc.credentials$;
        this.credentials.subscribe(obs => {
          console.log('credentials loaded');
          console.log(obs);
        });

        this.relationships = this.relationshipStateSvc.relationships$;
        this.relationships.subscribe(obs => {
          console.log('relationships loaded');
          console.log(obs);
        });

        this.issuers = this.stateSvc.issuers$;
        this.issuers.subscribe(obs => {
          console.log('issuers loaded');
          console.log(obs);
        });

        this.proofs = this.stateSvc.certificatesOfProof$;
        this.proofs.subscribe(obs => {
          console.log('proofs loaded');
          console.log(obs);
        });
      }
    });
  }

  async initializeItems() {
    await this.actionSvc.getCertificates({
      did: this.route.snapshot.paramMap.get('did')
    });
  }

  async getItems(issuers, ev: any) {
    const filtered = [];
    // Reset items back to all of the items
    await this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      /* this.issuers = this.issuers.filter(item => {
         return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
       });*/
    }

    return filtered;
  }

  async presentActionSheet(certId: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Certificate',
          handler: () => this.router.navigate(['/verify-credentials/view/' + certId])
        },
        {
          text: 'Verify Certificate Claims',
          handler: () => {
            this.verifyCredPopup();
          }
        },
        {
          text: 'Delete Certificate',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  async verifyCredPopup() {
    const alert = await this.alertController.create({
      header: 'Certificate Claims Verified',
      message: '<strong>Success!</strong> All claims within this certificate are valid.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
