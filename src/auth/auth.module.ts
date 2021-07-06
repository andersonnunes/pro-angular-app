import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module')
          .then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module')
          .then(m => m.RegisterModule)
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAFGLdw_Dv6qzwngjQryZklnyuRY9lsW78",
  authDomain: "pro-angular-app.firebaseapp.com",
  projectId: "pro-angular-app",
  storageBucket: "pro-angular-app.appspot.com",
  messagingSenderId: "376726356986",
  appId: "1:376726356986:web:229aae1aac601cfedfda43"
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
