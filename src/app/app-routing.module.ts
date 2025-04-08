import { RouterModule, Routes } from '@angular/router';

import { CheckTutorial } from './providers/check-tutorial.service';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'user-reports',
    loadChildren: () => import('./pages/user-reports/user-reports.module').then(m => m.UserReportsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsPageModule)
  },
  {
    path: 'news-feed',
    loadChildren: () => import('./pages/news-feed/news-feed.module').then(m => m.NewsFeedPageModule)
  },
  {
    path: 'chatrooms',
    loadChildren: () => import('./pages/chatrooms/chatrooms.module').then(m => m.ChatroomsPageModule)
  },
  {
    path: 'help-centers',
    loadChildren: () => import('./pages/help-centers/help-centers.module').then(m => m.HelpCentersPageModule)
  },
  {
    path: 'social-worker-detail',
    loadChildren: () => import('./pages/social-worker-detail/social-worker-detail.module').then(m => m.SocialWorkerDetailPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
