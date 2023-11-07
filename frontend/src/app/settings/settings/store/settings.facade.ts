import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../shared/store/user.selectors';
import { applyFormToDto, SettingsFormGroup } from '../../form';
import { take } from 'rxjs';
import { updateUserSettings } from '../../../shared/store/user.actions';

@Injectable({providedIn: 'root'})
export class SettingsFacade {
  user$ = this.store.select(selectUser);
  constructor(
    private store: Store,
  ) {}

  submit(form: SettingsFormGroup) {
    this.user$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(updateUserSettings({ settings: applyFormToDto(form, user || {}) }))
    })
  }
}
