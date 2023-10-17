import { NgModule } from '@angular/core';
import { MainTabSwitcherComponent } from './components/main-tab-switcher/main-tab-switcher.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    MainTabSwitcherComponent,
    IconComponent,
  ],
  exports: [
    MainTabSwitcherComponent
  ],
  imports: [
    MatTabsModule,
    RouterOutlet,
    CommonModule,
  ]
})
export class SharedModule { }
