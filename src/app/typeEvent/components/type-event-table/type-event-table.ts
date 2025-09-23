import { Component, computed, inject, input, signal } from '@angular/core';
import { TypeEvent } from '../../interfaces/type-event';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TypeEventService } from '../../services/type-event-data';
import { Delete } from '../../../common/dialogs/delete/delete';

@Component({
  selector: 'app-type-event-table',
  imports: [RouterLink, DatePipe, Delete],
  templateUrl: './type-event-table.html',
  styleUrl: './type-event-table.css',
})
export class TypeEventTable {
  public message = signal<string>('el Tipo de Evento');
  public typeEvents = input<TypeEvent[] | null>();
  public reload = input<() => void>();
  private modalOpen = signal<boolean>(false);
  private typeEventDelete = signal<string | null>(null);
  private snackbarVisible = signal<boolean>(false);

  private currentPage = signal(1);
  private readonly pageSize = 10;
  private readonly _typeEventService = inject(TypeEventService);

  public totalPages = computed(() =>
    this.typeEvents() ? Math.ceil(this.typeEvents()!.length / this.pageSize) : 1
  );

  public paginatedTypeEvents = computed(() => {
    const all = this.typeEvents();
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
    this.typeEventDelete.set(id);
    this.modalOpen.set(true);
  }

  public closeDialog() {
    this.typeEventDelete.set(null);
    this.modalOpen.set(false);
  }

  public deleteTypeEventConfirm() {
    if (this.typeEventDelete()) {
      const id = this.typeEventDelete()!;

      this._typeEventService.deleteTypeEvent(id).subscribe(() => {
        this.closeDialog();
        this.showSnackbarNow();

        this.reload()?.();
      });
    }
  }

  public isModalOpen = computed(() => this.modalOpen());
  public showSnackbar = computed(() => this.snackbarVisible());

  private showSnackbarNow() {
    this.snackbarVisible.set(true);
    setTimeout(() => this.snackbarVisible.set(false), 4000);
  }
}
