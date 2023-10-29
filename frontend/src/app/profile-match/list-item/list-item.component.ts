import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserRoleMap } from '../../shared/models/user-role';
import { ComplaintType, ComplaintTypeMap } from '../../shared/models/complaint';
import { UserFacade } from '../../shared/store/user.facade';

type EnhancedUser = User & { chatRequested?: boolean };

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() page: 'requests' | 'matches' = 'requests';
  @Input() value?: EnhancedUser;

  @Output() cancel = new EventEmitter<number>();
  @Output() approve = new EventEmitter<number>();
  @Output() request = new EventEmitter<number>();
  @Output() cancelRequest = new EventEmitter<number>();

  protected readonly UserRoleMap = UserRoleMap;
  protected readonly ComplaintType = ComplaintType;
  complaints = Object.keys(ComplaintTypeMap).map((complaint) => ({
    label: ComplaintTypeMap[complaint as ComplaintType],
    value: complaint as ComplaintType,
  }))

  constructor(private readonly userFacade: UserFacade) {}

  handleCancel() {
    this.cancel.emit(this.value?.id);
  }

  handleApprove() {
    this.approve.emit(this.value?.id);
  }

  handleRequest() {
    this.request.emit(this.value?.id);
  }

  handleCancelRequest() {
    this.cancelRequest.emit(this.value?.id);
  }

  onReport(complaint: ComplaintType) {
    this.value?.id && this.userFacade.reportUser(this.value.id, complaint);
  }

  onRemoveMatch() {
    this.value?.id && this.userFacade.removeMatch(this.value.id);
  }

  onBlockUser() {
    this.value?.id && this.userFacade.blockUser(this.value.id);
  }
}
