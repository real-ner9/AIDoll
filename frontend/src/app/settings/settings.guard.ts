import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import {
  CanDeactivate
} from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../shared/models/user';
import { selectUser } from '../shared/store/user.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UnsavedForm {
  /**
   * Есть ли несохраненные изменения в компоненте
   */
  readonly hasUnsavedChanges: boolean;
  readonly confirmTitle?: string;
  /**
   * Текст или шаблон подтверждающего сообщения
   */
  readonly confirm?: string | TemplateRef<any>;
  /**
   * Колбэк, который будет вызван если hasUnsavedChanges.
   * Если вернется falsy, то переход будет отменен.
   * Функция должна быть прибиндена к компоненту, иначе потеряет контекст
   */
  saveBeforeDeactivate?: () => Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanDeactivate<unknown>, OnDestroy {
  user: User | null | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private _snackBar: MatSnackBar,
  ) {
    this.store.select(selectUser).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {
      this.user = user;
    });
  }

  canDeactivate(
    component: UnsavedForm,
  ): Observable<boolean> | boolean {
    if (this.user && (!this.user.description || !this.user.name || !this.user.role || !this.user.dateOfBirth)) {
      alert("Заполни недостающие поля своей анкеты");
      return false;
    }

    if (this.user && !this.user.isVisibleToOthers) {
      alert("Прежде чем смотреть на других, сделай свою анкету видимой в ленте");
      return false;
    }

    if(component.hasUnsavedChanges) {
      return confirm("Внесенные изменения не будут сохранены. Продолжить?");
    }

    return true;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
