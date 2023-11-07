import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileStoreService } from '../../shared/services/file-store.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhotoInputComponent),
      multi: true
    }
  ]
})
export class PhotoInputComponent implements ControlValueAccessor {
  @Input() maxPhotos = 1;
  @Input() initialPhotoUrl?: string;

  // Массив для хранения URL изображений
  imageUrls: string[] = [];
  loading: boolean = false;

  constructor(
    private fileStoreService: FileStoreService,
  ) {
  }

  // Функции, которые будут переопределены позже
  onChange: any = () => {};
  onTouched: any = () => {};

  async onFilesSelected(event: Event, index?: number) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file: File = input.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/webp'];

    if (validImageTypes.includes(file.type)) {
      if (file.size <= 50 * 1024 * 1024) { // 50MB
        // Если индекс был передан, то производим замену изображения
        try {
          this.loading = true;
          if (typeof index === 'number') {
            this.fileStoreService.uploadFile(file).pipe(take(1)).subscribe(
              ({id}) => {
                this.loading = false;
                this.imageUrls[index] = `${id}`;
              },
              error => {
                this.loading = false;
                alert('Не удалось загрузить фотографию');
              });
          } else if (this.imageUrls.length < this.maxPhotos) {
            this.fileStoreService.uploadFile(file).pipe(take(1)).subscribe(
              ({id}) => {
                this.loading = false;
                this.imageUrls.push(`${id}`);
              },
              error => {
                this.loading = false;
                alert('Не удалось загрузить фотографию');
              });
          } else {
            alert("Вы не можете загрузить больше фотографий.");
            return;
          }
          this.onChange(this.imageUrls);
        } catch {
          alert('Не удалось загрузить фотографию')
        }
      } else {
        alert("Изображение должно быть размером не более 50 МБ.");
      }
    } else {
      alert("Пожалуйста, загрузите изображение в формате JPEG, PNG или WEBP.");
    }
  }


  // Методы ControlValueAccessor
  writeValue(imageUrls: string[]): void {
    if (imageUrls) {
      this.imageUrls = imageUrls;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  openFileInput(fileInput: HTMLInputElement) {
    !this.loading && fileInput.click();
  }

  confirmRemoval(index: number) {
    if (window.confirm('Вы действительно хотите удалить это изображение?')) {
      this.removeImage(index);
    }
  }

  async removeImage(index: number) {
    try {
      if (this.imageUrls[index] !== this.initialPhotoUrl) {
        this.fileStoreService.deleteFile(this.imageUrls[index]).pipe(take(1)).subscribe(
          () => {
            this.imageUrls.splice(index, 1);
            this.onChange(this.imageUrls);
          }
        );
      } else {
        this.imageUrls.splice(index, 1);
        this.onChange(this.imageUrls);
      }
    } catch (e) {
      alert('Не удалось удалить фотографию');
    }
  }

  confirmChange(fileInput: HTMLInputElement) {
    if (window.confirm('Вы действительно хотите изменить это изображение?')) {
      fileInput.click();
    }
  }
}

