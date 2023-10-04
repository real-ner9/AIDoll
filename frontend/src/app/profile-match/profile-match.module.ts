import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileMatchRoutingModule } from './profile-match-routing.module';
import { ProfileMatchComponent } from './profile-match/profile-match.component';


@NgModule({
  declarations: [
    ProfileMatchComponent
  ],
  imports: [
    CommonModule,
    ProfileMatchRoutingModule
  ]
})
export class ProfileMatchModule { }
