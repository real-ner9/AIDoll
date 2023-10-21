import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedFacade } from './store/feed.facade';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnInit, OnDestroy {
  feed$ = this.facade.feed$;
  pageNumber = 1;
  pageSize = 10;

  scrollDistance = 1.5;
  scrollUpDistance = 1.5;
  throttle = 300;

  constructor(
    private facade: FeedFacade,
  ) {
  }

  ngOnInit() {
    this.facade.clearFeed();
    this.facade.loadFeed(this.pageSize, this.pageNumber)
  }

  onScroll() {
    this.pageNumber++
    this.facade.loadFeed(this.pageSize, this.pageNumber)
  }

  ngOnDestroy() {
    this.facade.clearFeed();
  }
}
