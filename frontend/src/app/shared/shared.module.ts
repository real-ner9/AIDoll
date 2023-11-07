import { NgModule } from '@angular/core';
import { MainTabSwitcherComponent } from './components/main-tab-switcher/main-tab-switcher.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { BackgroundForSwitcherComponent } from './components/background-for-switcher/background-for-switcher.component';
import { PhotoUrlPipe } from './pipes/photo-url.pipe';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { AgePipe } from './pipes/age.pipe';

@NgModule({
  declarations: [
    MainTabSwitcherComponent,
    IconComponent,
    BackgroundForSwitcherComponent,
    PhotoUrlPipe,
    ButtonComponent,
    AgePipe,
  ],
  exports: [
    MainTabSwitcherComponent,
    BackgroundForSwitcherComponent,
    IconComponent,
    PhotoUrlPipe,
    AgePipe,
  ],
  imports: [
    MatTabsModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
    MatButtonModule,
  ]
})
export class SharedModule { }
