import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-tab-switcher',
  templateUrl: './main-tab-switcher.component.html',
  styleUrls: ['./main-tab-switcher.component.scss']
})
export class MainTabSwitcherComponent implements OnInit {
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Мэтчи',
        labelKey: 'matches',
        link: '/matches',
        index: 0,
        icon: 'matches',
      },
      {
        label: 'Лента',
        labelKey: 'feed',
        link: '/feed',
        index: 1,
        icon: 'feed',
      },
      {
        label: 'Профиль',
        labelKey: 'settings',
        link: '/settings',
        disabled: true,
        index: 1,
        icon: 'settings',
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
