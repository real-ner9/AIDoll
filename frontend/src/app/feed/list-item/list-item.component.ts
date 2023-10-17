import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() page: 'feed' | 'likes' = 'feed';
  handleDislike() {
    console.log('handleCancel');
  }

  handleLike() {
    console.log('handleApprove');
  }
}
