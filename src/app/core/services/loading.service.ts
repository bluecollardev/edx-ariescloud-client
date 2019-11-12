import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  async presentLoading(message: string = 'loading', duration: number = 10000) {
    const loading = await this.loadingController.create({
      message,
      duration,
    });
    return loading;
  }

  constructor(public loadingController: LoadingController) {}
}
