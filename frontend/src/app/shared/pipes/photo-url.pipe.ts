import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'photoUrl'
})
export class PhotoUrlPipe implements PipeTransform {

  transform(photoId: string): string {
    return `${environment.s3url}/${photoId}`;
  }
}
