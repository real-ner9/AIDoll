import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { SocketService } from './shared/services/user-socket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  webApp = window.Telegram.WebApp;
  user: any = {};
  error = '';

  constructor(
    private readonly userService: UserService,
    private readonly socketUserService: SocketService,
  ) {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const initDataString = params.get('tgWebAppData');
    const initData = new URLSearchParams(initDataString as any);
    const user = initData.get('user') || localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }

    this.updateTelegramData();

    this.userService.authorize().pipe(take(1)).subscribe(
      response => console.log('response: ', response),
      error => {
        console.log(error);
        this.error = error.error.reason
      },
    );

    this.webApp.expand();
  }

  updateTelegramData() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const initDataString = params.get('tgWebAppData');

    if (initDataString) {
      const initData = new URLSearchParams(initDataString);
      const hash = initData.get('hash');
      if (hash) {
        localStorage.setItem('authData', initDataString);
        const userData = initData.get('user');
        if (userData) {
          localStorage.setItem('user', userData)
        }
      }
    }
  }
}
