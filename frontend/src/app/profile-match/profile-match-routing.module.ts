import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMatchComponent } from './profile-match/profile-match.component';

const routes: Routes = [
  { path: '', component: ProfileMatchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileMatchRoutingModule { }
