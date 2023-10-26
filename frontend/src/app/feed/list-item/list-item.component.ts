import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserRoleMap } from '../../shared/models/user-role';


@Component({
  selector: 'app-feed-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() page: 'feed' | 'likes' = 'feed';
  @Input() value?: User;

  @Output() like = new EventEmitter<number>();
  @Output() dislike = new EventEmitter<number>();

  likedUser: Set<number> = new Set()

  protected UserRoleMap = UserRoleMap;

  handleDislike(user: User) {
    this.likedUser.add(user.id);
    this.dislike.emit(user.id);
  }

  handleLike(user: User) {
    this.likedUser.add(user.id);
    this.like.emit(user.id);
  }
}
