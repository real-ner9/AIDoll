import { FormControl, FormGroup } from '@angular/forms';
import { required } from '../shared/utils/validators';
import { UserRole } from '../shared/models/user-role';
import { Settings } from '../shared/models/settings';
import { getUTCDate } from '../shared/utils/date';
import { User } from '../shared/models/user';

export type SettingsFormGroup = ReturnType<typeof createSettingsForm>;

export function createSettingsForm() {
  return new FormGroup({
    name: new FormControl<string | null>(null, required()),
    description: new FormControl<string | null>(null, required()),
    photoUrls: new FormControl<string[] | null>([]),
    role: new FormControl<UserRole | null>(null, required()),
    showUsername: new FormControl<boolean>(true, required()),
    isVisibleToOthers: new FormControl<boolean>(true, required()),
    dateOfBirth: new FormControl<Date | string | null>(null, required()),
  });
}

export function applyDtoToForm(form: SettingsFormGroup, dto: Settings | User): SettingsFormGroup {
  form.patchValue({
    name: dto.name || null,
    description: dto.description || null,
    photoUrls: dto.photoUrl ? [dto.photoUrl] : [],
    role: dto.role || null,
    showUsername: dto.showUsername == null ? true : dto.showUsername,
    isVisibleToOthers: dto.isVisibleToOthers == null ? true : dto.isVisibleToOthers,
    dateOfBirth: dto.dateOfBirth ? getUTCDate(dto.dateOfBirth) : null,
  });

  return form;
}


export function applyFormToDto(form: SettingsFormGroup, dto: Settings | User): Settings {
  const formValue = form.value;
  return {
    name: formValue.name || undefined,
    description: formValue.description || undefined,
    photoUrl: formValue.photoUrls?.length ? formValue.photoUrls[0] : null,
    role: formValue.role || undefined,
    showUsername: !!formValue.showUsername,
    isVisibleToOthers: !!formValue.isVisibleToOthers,
    dateOfBirth: formValue.dateOfBirth ? getUTCDate(formValue.dateOfBirth) as Date : undefined,
  };
}
