import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() page: 'requests' | 'matches' = 'requests';
  @Input() value?: User;

  handleCancel() {
    console.log('handleCancel');
  }

  handleApprove() {
    console.log('handleApprove');
  }

  handleRequest() {
    console.log('handleRequest');
  }

  handleCancelRequest() {
    console.log('handleCancelRequest');
  }
}
