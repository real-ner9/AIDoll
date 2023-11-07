import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page';
import { Match } from '../models/match';
import { User } from '../models/user';
import { ComplaintType } from '../models/complaint';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private path = 'api/user'

  constructor(private http: HttpClient) {
  }

  authorize() {
    return this.http.get<User>(`${this.path}/authorize`, {
      observe: 'body',
      responseType: 'json',
    },);
  }

  getMatches() {
    return this.http.get<Page<Match>>(`${this.path}/matches`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getRequests() {
    return this.http.get<Page<User>>(`${this.path}/requests`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getFeed(params: { pageSize: number, pageNumber: number }) {
    return this.http.get<Page<User>>(`${this.path}/feed`, {
      observe: 'body',
      responseType: 'json',
      params: {
        pageSize: params.pageSize || 10,
        pageNumber: params.pageNumber || 1,
      },
    });
  }

  getUsersWhoLikedMe(params: { pageSize: number, pageNumber: number }) {
    return this.http.get<Page<User>>(`${this.path}/liked-me`, {
      observe: 'body',
      responseType: 'json',
      params: {
        pageSize: params.pageSize || 10,
        pageNumber: params.pageNumber || 1,
      },
    });
  }

  blockUser(blockedUserId: number) {
    return this.http.post<{ id: number }>(`${this.path}/block`, {
      blockedUserId: blockedUserId
    }, {
      observe: 'body',
      responseType: 'json',
    });
  }

  reportUser(reportedUserId: number, reason: ComplaintType) {
    return this.http.post<{ id: number }>(`${this.path}/complain`, {
      reportedUserId: reportedUserId,
      reason: reason
    }, {
      observe: 'body',
      responseType: 'json',
    });
  }

  removeMatch(removedUserId: number) {
    return this.http.post<{ id: number }>(`${this.path}/removeMatch`, {
      removedUserId: removedUserId
    }, {
      observe: 'body',
      responseType: 'json',
    });
  }

  updateSettings(settings: Settings) {
    return this.http.patch<User>(`${this.path}/settings`, settings, {
      observe: 'body',
      responseType: 'json',
    });
  }
}
