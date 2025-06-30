import { Component, computed, input, signal } from '@angular/core';
import { Event } from '../../interfaces/event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'event-table',
  imports: [DatePipe],
  templateUrl: './event-table.html',
  styleUrl: './event-table.css',
})
export class EventTable {
  public events = input<Event[] | null>();

  private currentPage = signal(1);
  private readonly pageSize = 10;

  public totalPages = computed(() =>
    this.events() ? Math.ceil(this.events()!.length / this.pageSize) : 1
  );

  public paginatedEvents = computed(() => {
    const all = this.events();
    const start = (this.currentPage() - 1) * this.pageSize;
    return all?.slice(start, start + this.pageSize);
  });

  public goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  public prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  public nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  public currentPageSignal = this.currentPage();
}
