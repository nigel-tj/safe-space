import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SchedulePage } from '../schedule/schedule';
import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        children: [
          {
            path: '',
            component: SchedulePage,
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
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
            path: 'speakers/spaeker-details/:social-worker-id',
            loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
          },
          {
            path: 'social-worker-detail/:social-worker-id',
            loadChildren: () => import('../social-worker-detail/social-worker-detail.module').then(m => m.SocialWorkerDetailPageModule)
          }

        ]
      },
      {
        path: 'speakers',
        children: [
          {
            path: '',
            loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
          },
          {
            path: 'speaker-details/:social-worker-id',
            loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../help-centers/help-centers.module').then(m => m.HelpCentersPageModule)
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
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: 'news-feed',
        children: [
          {
            path: '',
            loadChildren: () => import('../news-feed/news-feed.module').then(m => m.NewsFeedPageModule)
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          },
          {
            path: 'social-workers/:social-worker-id',
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
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

