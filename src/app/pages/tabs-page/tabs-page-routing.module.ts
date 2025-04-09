import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'news-feed',
        children: [
          {
            path: '',
            loadChildren: () => import('../news-feed/news-feed.module').then(m => m.NewsFeedPageModule)
          },
          {
            path: 'social-workers/:social-worker-id',
            loadChildren: () => import('../social-worker-detail/social-worker-detail.module').then(m => m.SocialWorkerDetailPageModule)
          }
        ]
      },
      {
        path: 'social-workers',
        children: [
          {
            path: '',
            loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
          },
          {
            path: 'social-worker-detail/:social-worker-id',
            loadChildren: () => import('../social-worker-detail/social-worker-detail.module').then(m => m.SocialWorkerDetailPageModule)
          }
        ]
      },
      {
        path: 'chatrooms',
        children: [
          {
            path: '',
            loadChildren: () => import('../chatrooms/chatrooms.module').then(m => m.ChatroomsPageModule)
          }
        ]
      },
      {
        path: 'reports',
        children: [
          {
            path: '',
            loadChildren: () => import('../reports/reports.module').then(m => m.ReportsPageModule)
          }
        ]
      },
      {
        path: 'help-centers',
        children: [
          {
            path: '',
            loadChildren: () => import('../help-centers/help-centers.module').then(m => m.HelpCentersPageModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/news-feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/tabs/news-feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

