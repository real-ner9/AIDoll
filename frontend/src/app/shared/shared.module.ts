import { NgModule } from '@angular/core';
import { MainTabSwitcherComponent } from './components/main-tab-switcher/main-tab-switcher.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { BackgroundForSwitcherComponent } from './components/background-for-switcher/background-for-switcher.component';
import { PhotoUrlPipe } from './pipes/photo-url.pipe';

@NgModule({
  declarations: [
    MainTabSwitcherComponent,
    IconComponent,
    BackgroundForSwitcherComponent,
    PhotoUrlPipe,
  ],
  exports: [
    MainTabSwitcherComponent,
    BackgroundForSwitcherComponent,
    IconComponent,
    PhotoUrlPipe
  ],
  imports: [
    MatTabsModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class SharedModule { }
