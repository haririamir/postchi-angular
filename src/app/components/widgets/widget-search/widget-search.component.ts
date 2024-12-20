import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule,  } from '@angular/forms';

@Component({
  selector: 'widget-search',
  templateUrl: './widget-search.component.html',
  styleUrls: ['./widget-search.component.scss'],
  imports: [FormsModule],
})
export class WidgetSearchComponent {
  filterText: string = '';

  @Output() onSearchChange = new EventEmitter<any>(); // Keyup event emitter

  handleSearchChange(event: any) {
    this.onSearchChange.emit(event);
  }

  handleClearInput() {
    this.filterText = '';
    this.onSearchChange.emit('');
  }
}
