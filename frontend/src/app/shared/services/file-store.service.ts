import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStoreService {
  private path = 'api/file-store';

  constructor(private http: HttpClient) {}

  // Загрузить файл на сервер
  uploadFile(file: File): Observable<{id: string}> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ id: string }>(`${this.path}/upload`, formData);
  }

  // Удалить файл с сервера
  deleteFile(fileId: string): Observable<any> {
    return this.http.delete(`${this.path}/${fileId}`);
  }
}
