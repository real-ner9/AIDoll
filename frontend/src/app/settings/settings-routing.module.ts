import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SettingsGuard } from './settings.guard';

const routes: Routes = [
  { path: '', component: SettingsComponent, canDeactivate: [SettingsGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
