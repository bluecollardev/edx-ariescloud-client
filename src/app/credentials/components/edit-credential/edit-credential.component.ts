import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Edit Credential</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <br />
      <br />
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <form onsubmit="processForm(event)">
            <ion-list lines="full" class="ion-no-margin ion-no-padding">
              <ion-item>
                <ion-label position="stacked">Credential Name <ion-text color="danger">*</ion-text></ion-label>
                <ion-input required type="text" oninput="handleLastNameValue(event)">Bachelor's Degree of Science</ion-input>
              </ion-item>
    
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="stacked">Select Schema<ion-text color="danger">*</ion-text></ion-label>
                      <ion-select required>
                        <ion-select-option>v1.1</ion-select-option>
                        <ion-select-option>v1.2</ion-select-option>
                        <ion-select-option selected>v1.3</ion-select-option>
                        <ion-select-option>v2.0</ion-select-option>
                      </ion-select>
                    </ion-item>
                  </ion-col>
                  <ion-col size="3">
                    <ion-button margin-end><ion-icon name="add"></ion-icon> New</ion-button>
                  </ion-col>
                </ion-row>
    
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-label position="stacked">New Data Field </ion-label>
                      <ion-input required type="text"></ion-input>
                    </ion-item>
                  </ion-col>
                  <ion-col size="3">
                    <ion-button margin-end><ion-icon name="add"></ion-icon> Add</ion-button>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-list>
                      <ion-item>
                        <ion-label>Name</ion-label>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </ion-item>
                      <ion-item>
                        <ion-label>Degree</ion-label>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </ion-item>
                      <ion-item>
                        <ion-label>Status</ion-label>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </ion-item>
                      <ion-item>
                        <ion-label>Year</ion-label>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </ion-item>
                      <ion-item>
                        <ion-label>Average</ion-label>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </ion-item>
                      <ion-item>
                        <ion-label>SSN</ion-label>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </ion-item>
                    </ion-list>
                  </ion-col>
                </ion-row>
              </ion-grid>
    
              <ion-item>
                <ion-label position="stacked">Sample Data</ion-label>
                <!--<ion-textarea></ion-textarea>-->
                <pre>
                </pre>
              </ion-item>
            </ion-list>
    
            <div class="ion-padding">
              <ion-button expand="block" type="submit" class="ion-no-margin">Update Credential</ion-button>
            </div>
          </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./edit-credential.component.scss']
})
export class EditCredentialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
