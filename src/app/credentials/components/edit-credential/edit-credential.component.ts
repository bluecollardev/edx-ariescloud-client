import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

import { CredentialActionsService } from '../../services/credential-actions.service';
import {
  CredentialStateService,
  ICredentialDef
} from '../../services/credential-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="end"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated"
          >Edit Credential Type</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <br />
      <br />
      <ion-grid>
        <ion-row>
          <ion-col >
            <form [formGroup]="fg">
              <ion-list lines="full" class="ion-no-margin ion-no-padding">
                <ion-item>
                  <ion-label position="stacked"
                    >Credential Name
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input type="text" formControlName="name"></ion-input>
                </ion-item>

                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-item>
                        <ion-label position="stacked"
                          >Select Schema
                          <ion-text color="danger">*</ion-text>
                        </ion-label>
                        <ion-select required formControlName="version">
                          <ion-select-option>v1.1</ion-select-option>
                          <ion-select-option>v1.2</ion-select-option>
                          <ion-select-option>v1.3</ion-select-option>
                          <ion-select-option>v2.0</ion-select-option>
                        </ion-select>
                      </ion-item>
                    </ion-col>
                    <ion-col size="3">
                      <ion-button margin-end (click)="this.newSchemaPopup()">
                        <ion-icon name="add"></ion-icon>
                        New
                      </ion-button>
                    </ion-col>
                  </ion-row>

                  <ion-row>
                    <ion-col>
                      <ion-item>
                        <ion-label position="stacked">Create Claim</ion-label>
                        <ion-input required type="text" [formControl]="baseFc">
                        </ion-input>
                      </ion-item>
                    </ion-col>
                    <ion-col size="3">
                      <ion-button margin-end (click)="addFc(fg, baseFc)">
                        <ion-icon name="add"></ion-icon> Add
                      </ion-button>
                    </ion-col>
                  </ion-row>

                  <ion-row
                    *ngFor="
                      let itm of fg.controls['schema']['controls'];
                      index as i
                    "
                  >
                    <ng-container *ngIf="itm.value != null">
                      <ion-col>
                        <ion-list>
                          <ion-item>
                            <ion-label>{{ itm.value }}</ion-label>
                            <ion-icon
                              name="remove-circle-outline"
                              (click)="removeFc(fg, i)"
                            ></ion-icon>
                          </ion-item>
                        </ion-list>
                      </ion-col>
                    </ng-container>
                  </ion-row>
                </ion-grid>
              </ion-list>

              <div class="ion-padding">
                <ion-button
                  expand="block"
                  (click)="submit(fg)"
                  class="ion-no-margin"
                >
                  <ion-icon name="save"></ion-icon>
                  Update Credential
                </ion-button>
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./edit-credential.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCredentialComponent implements OnInit {
  fg: FormGroup;
  baseFc = new FormControl(null);
  valid = false;

  constructor(
    private route: ActivatedRoute,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) {
    const fg = new FormGroup({
      name: new FormControl('', [Validators.required]),
      version: new FormControl('', [Validators.required]),
      schema: new FormArray([])
    });
    this.fg = fg;
  }

  async ngOnInit() {
    const schema$ = this.actionSvc.getCredentialDef(
      this.route.snapshot.paramMap.get('id')
    );

    const schema = await schema$.toPromise();

    this.fg.controls.name.setValue(schema.name);
    this.fg.controls.version.setValue(schema.version);
    const fa = new FormArray([]);
    for (const attr of schema.attributes) {
      fa.push(new FormControl(attr));
    }
    this.fg.controls.schema = fa;
    this.fg.updateValueAndValidity();
    console.log('schema', schema);
    // const fg = new FormGroup({
    //   name: new FormControl('', [Validators.required]),
    //   version: new FormControl('', [Validators.required]),
    //   schema: new FormArray([])
    // });
  }

  addFc(fg: FormGroup, baseFc: FormControl) {
    console.log(fg);
    if (!baseFc.value) return console.log('invalid');
    const fc = new FormControl(baseFc.value, Validators.required);
    // tslint:disable-next-line: no-string-literal
    fg.controls.schema['controls'].unshift(fc);
    this.fg = fg;
    baseFc.clearValidators();
    baseFc.updateValueAndValidity();
    baseFc.setValue(null);
  }

  removeFc(fg: FormGroup, i: number) {
    // tslint:disable-next-line: no-string-literal
    console.log('index', i);
    const schema = fg.controls.schema['controls'];
    schema.splice(i, 1);
    fg.controls.schema['controls'] = schema;
    this.fg = fg;
  }

  submit(fg: FormGroup) {
    const credDef = fg.value;
    fg.valid
      ? (console.log('valid'), this.sendCredDef(credDef))
      : console.log('invalid', (this.valid = false));

    // re-direct url of some kind
  }

  async sendCredDef(credDef: ICredentialDef) {
    const loading = await this.loadingController.create({
      message: 'Updating credential definition',
      duration: 10000
    });
    await loading.present();
    try {
      const res = await this.actionSvc.submitCredDef(credDef);
      if (res) {
        this.stateSvc.credentialDefs$ = this.actionSvc.getCredentialDefs();
        loading.dismiss();
        this.router.navigate(['/credentials']);
      }
      loading.dismiss();
    } catch {
      loading.dismiss();
    }
  }

  async newSchemaPopup() {
    const alert = await this.alertController.create({
      header: 'Create a New Schema',
      inputs: [
        {
          name: '',
          type: 'text',
          placeholder: 'MySchema'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
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
