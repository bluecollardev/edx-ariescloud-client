import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  async presentToast(message, duration) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
    });
    toast.present();
  }

  async alert(opts: { message?; header?; buttons?: string[] }) {
    const {
      message = 'Something went wrong',
      header = 'Error',
      buttons = ['Ok'],
    } = opts;
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons,
    });

    await alert.present();
  }

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {}
}
