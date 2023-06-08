import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  
  @Output() pageSetted: EventEmitter<number> = new EventEmitter<number>();

    setPage(number=1) {
      const page = this.currentPage += number;
      // this.updateDisplayedRestaurants();
      this.pageSetted.emit(page)
    }
}
