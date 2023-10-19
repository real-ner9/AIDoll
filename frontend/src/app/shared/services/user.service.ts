import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private path = 'api/user'

  constructor(private http: HttpClient) {
  }

  authorize() {
    return this.http.get(`${this.path}/authorize`, {
      observe: 'body',
      responseType: 'json',
    },);
  }

  getMatches() {
    return this.http.get<Page<User>>(`${this.path}/matches`, {
      observe: 'body',
      responseType: 'json',
    });
  }
}
