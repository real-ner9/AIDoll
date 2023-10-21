import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-feed-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() page: 'feed' | 'likes' = 'feed';
  @Input() value?: User;
  handleDislike() {
    console.log('handleCancel');
  }

  handleLike() {
    console.log('handleApprove');
  }
}
