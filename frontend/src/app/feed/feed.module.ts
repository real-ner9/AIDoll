import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed/feed.component';
import { FeedTabSwitcherComponent } from './feed-tab-switcher/feed-tab-switcher.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { LikeListComponent } from './like-list/like-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FeedComponent,
    FeedTabSwitcherComponent,
    ListItemComponent,
    FeedListComponent,
    LikeListComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MatTabsModule,
    SharedModule,
    MatButtonModule
  ]
})
export class FeedModule { }
