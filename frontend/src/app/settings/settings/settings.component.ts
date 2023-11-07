import { Component, OnDestroy } from '@angular/core';
import { SettingsFacade } from './store/settings.facade';
import { filter, Subject, takeUntil } from 'rxjs';
import { applyDtoToForm, createSettingsForm } from '../form';
import { UserRoleMap } from '../../shared/models/user-role';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy{
  user$ = this.facade.user$;
  private unsubscribe$ = new Subject<void>();
  form = createSettingsForm();
  roles = Object.entries(UserRoleMap).map(([key, value]) => ({ key, value }));
  currentDate = new Date();
  startedAt = new Date(this.currentDate.getFullYear() - 18, this.currentDate.getMonth(), this.currentDate.getDate());

  constructor(
    public facade: SettingsFacade,
  ) {
    this.user$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(user => !!user)
      )
      .subscribe((user) => {
        applyDtoToForm(this.form, user || {});
        this.form.markAsPristine();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    this.facade.submit(this.form);
  }

  dateFilter(d: Date | null): boolean {
    if (d) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      // Сегодняшняя дата, но 99 лет назад
      const maxDate = new Date(currentYear - 99, currentMonth, currentDay);
      // Сегодняшняя дата, но 18 лет назад
      const minDate = new Date(currentYear - 18, currentMonth, currentDay);

      // Проверка, что выбранная дата находится в пределах от minDate до maxDate
      return d >= maxDate && d <= minDate;
    }
    return false;
  };

  get hasUnsavedChanges() {
    return this.form.dirty;
  }
}
