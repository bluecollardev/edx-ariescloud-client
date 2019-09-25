import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
            <form onsubmit="processForm(event)" [formGroup]="fg">
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
                        <ion-input required type="text"></ion-input>
                      </ion-item>
                    </ion-col>
                    <ion-col size="3">
                      <ion-button margin-end
                        ><ion-icon name="add"></ion-icon> Add</ion-button
                      >
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-list>
                        <ion-item>
                          <ion-label>Name</ion-label>
                          <ion-icon name="remove-circle-outline"></ion-icon>
                        </ion-item>
                      </ion-list>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-list>

              <div class="ion-padding">
                <ion-button expand="block" type="submit" class="ion-no-margin"
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

  constructor() {}

  ngOnInit() {
    const fg = new FormGroup({
      name: new FormControl('', Validators.required),
      version: new FormControl('', [Validators.required])
    });

    this.fg = fg;

    fg.valueChanges.subscribe(obs => console.log(obs));
  }
}
