import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMatchModule } from './profile-match/profile-match.module';

const routes: Routes = [
  // { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: 'profile-match', pathMatch: 'full' },
  { path: 'profile-match', loadChildren: () => ProfileMatchModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
