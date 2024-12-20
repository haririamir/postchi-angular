import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IAction {
  title: string;
  type: string;
  icon: string;
}
interface IPaginate {
  page: number;
  size: number;
  total: number;
}

@Component({
  selector: 'widget-table',
  templateUrl: './widget-table.component.html',
  styleUrls: ['./widget-table.component.scss'],
  imports: [CommonModule],
})
export class WidgetTableComponent {
  @Input() columns: {
    label: string;
    key: string;
    type?: string;
    width?: string;
    sortable?: boolean;
    sortName?: string;
  }[] = [
    {
      label: '',
      key: '',
      type: '',
      width: '',
      sortable: false,
      sortName: '',
    },
  ];
  @Input() actions: IAction[] = [];
  @Input() classTd: string = '';
  @Input() labelValue: string = 'id';
  @Input() showCheckbox: boolean = false;
  @Input() items: { [key: string]: any }[] = [];
  @Input() paginate: IPaginate = { size: 0, page: 0, total: 0 };

  @Output() onSort: EventEmitter<any> = new EventEmitter();
  @Output() onActions: EventEmitter<any> = new EventEmitter();
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onChangeStatus: EventEmitter<any> = new EventEmitter();
  @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

  selected = [];
  selectAll = false;

  constructor() {}

  onClick(item: any, action: string) {
    this.onActions.emit({ action, item });
  }

  page(event: any) {
    this.onPageChange.emit({
      page: event.page,
      size: event.size,
    });
  }
}
