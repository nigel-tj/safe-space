import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController);
  private authService = inject(AuthenticationService);

  credentials: FormGroup;

  constructor() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.checkAuthState();
  }

  private async checkAuthState() {
    const isAuthenticated = await this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigateByUrl('/app/tabs/news-feed', { replaceUrl: true });
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      await this.authService.login(this.credentials.value);
      await loading.dismiss();
      this.router.navigateByUrl('/app/tabs/news-feed', { replaceUrl: true });
    } catch (error) {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Login failed. Please check your credentials.',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          handler: async (data) => {
            const loading = await this.loadingController.create();
            await loading.present();

            try {
              await this.authService.resetPassword(data.email);
              await loading.dismiss();
              const toast = await this.toastController.create({
                message: 'Password reset email sent',
                duration: 3000,
                position: 'bottom',
                color: 'success'
              });
              await toast.present();
            } catch (error) {
              await loading.dismiss();
              const toast = await this.toastController.create({
                message: 'Failed to send reset email',
                duration: 3000,
                position: 'bottom',
                color: 'danger'
              });
              await toast.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
