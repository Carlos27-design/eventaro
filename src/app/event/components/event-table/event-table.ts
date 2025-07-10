import { Component, computed, inject, input, signal } from '@angular/core';
import { Events } from '../../interfaces/event';
import { DatePipe } from '@angular/common';
import { EventService } from '../../services/event-service';
import { Delete } from '../../../common/dialogs/delete/delete';

@Component({
  selector: 'event-table',
  imports: [DatePipe, Delete],
  templateUrl: './event-table.html',
  styleUrl: './event-table.css',
})
export class EventTable {
  public events = input<Events[] | null>();
  public reload = input<() => void>();
  private modalOpen = signal<boolean>(false);
  private eventDelete = signal<string | null>(null);
  private snackBarVisible = signal<boolean>(false);

  private currentPage = signal(1);
  private readonly pageSize = 10;
  private readonly _eventService = inject(EventService);

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

  public openDialog(id: string) {
    this.eventDelete.set(id);
    this.modalOpen.set(true);
  }

  public closeDialog() {
    this.eventDelete.set(null);
    this.modalOpen.set(false);
  }

  public deleteEventConfirm() {
    if (this.eventDelete()) {
      const id = this.eventDelete()!;

      this._eventService.deleteEvent(id).subscribe(() => {
        this.closeDialog();
        this.showSnackBarNow();

        this.reload()?.();
      });
    }
  }

  public isModalOpen = computed(() => this.modalOpen());

  public showSnackBar = computed(() => this.snackBarVisible());

  private showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }
}
