import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CredentialStateService } from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';

export interface ICredDef {
  name: string;
  version: string;
  schema: string[];
}

@Component({
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
        <ion-title class="ios title-ios hydrated">Create Credential</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <br />
      <br />
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <form [formGroup]="fg">
              <ion-list lines="full" class="ion-no-margin ion-no-padding">
                <ion-item>
                  <ion-label position="stacked"
                    >Credential Name
                    <ion-text color="danger">*</ion-text></ion-label
                  >
                  <ion-input type="text" formControlName="name"></ion-input>
                </ion-item>

                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-item>
                        <ion-label position="stacked"
                          >Select Schema<ion-text color="danger"
                            >*</ion-text
                          ></ion-label
                        >
                        <ion-select required formControlName="version">
                          <ion-select-option>v1.1</ion-select-option>
                          <ion-select-option>v1.2</ion-select-option>
                          <ion-select-option selected>v1.3</ion-select-option>
                          <ion-select-option>v2.0</ion-select-option>
                        </ion-select>
                      </ion-item>
                    </ion-col>
                    <ion-col size="3">
                      <ion-button margin-end
                        ><ion-icon name="add"></ion-icon> New</ion-button
                      >
                    </ion-col>
                  </ion-row>

                  <ion-row>
                    <ion-col>
                      <ion-item>
                        <ion-label position="stacked"
                          >Create Data Field
                        </ion-label>
                        <ion-input
                          required
                          type="text"
                          [formControl]="baseFc"
                        ></ion-input>
                      </ion-item>
                    </ion-col>
                    <ion-col size="3">
                      <ion-button margin-end (click)="addFc(fg, baseFc)"
                        ><ion-icon name="add"></ion-icon> Add</ion-button
                      >
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-label *ngIf="baseFc.invalid"
                        >Error message</ion-label
                      >
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

                <ion-item>
                  <ion-label position="stacked">Sample Data</ion-label>
                  <!--<ion-textarea></ion-textarea>-->
                  <pre></pre>
                </ion-item>
              </ion-list>

              <div class="ion-padding">
                <ion-button
                  expand="block"
                  (click)="submit(fg)"
                  class="ion-no-margin"
                  >Create Credential</ion-button
                >
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./create-credential.component.scss']
})
export class CreateCredentialComponent implements OnInit {
  fg: FormGroup;
  baseFc = new FormControl(null);
  valid = false;

  addFc(fg: FormGroup, baseFc: FormControl) {
    console.log(fg);
    if (!baseFc.value) return console.log('invalid');
    const fc = new FormControl(baseFc.value, Validators.required);
    // tslint:disable-next-line: no-string-literal
    fg.controls.schema['controls'].unshift(fc);
    this.fg = fg;
    baseFc.clearValidators();
    baseFc.updateValueAndValidity();
  }

  removeFc(fg: FormGroup, i: number) {
    // tslint:disable-next-line: no-string-literal
    console.log('index', i);
    const schema = fg.controls.schema['controls'];
    schema.splice(i, 1);
    fg.controls.schema = schema;
    this.fg = fg;
  }

  constructor(
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService
  ) {}

  ngOnInit() {
    const fg = new FormGroup({
      name: new FormControl('', Validators.required),
      version: new FormControl('', [Validators.required]),
      schema: new FormArray([])
    });

    this.fg = fg;

    fg.valueChanges.subscribe(obs => console.log(obs));
  }
  submit(fg: FormGroup) {
    const credDef = fg.value;
    fg.valid
      ? (console.log('valid'), this.sendCredDef(credDef))
      : console.log('invalid', (this.valid = false));

    // re-direct url of some kind
  }

  sendCredDef(credDef: ICredDef) {
    console.log(credDef);
    this.actionSvc.submitCredDef(credDef);
  }
}
