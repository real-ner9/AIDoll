import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date | string): number {
    if (!value) {
      return 99;
    }

    const birthdate = new Date(value);
    const timeDiff = Math.abs(Date.now() - birthdate.getTime());
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25); // Учитывает високосные годы

    return age;
  }
}
