import { Component, computed, inject, input, signal } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import { AuthData } from '../../services/auth-data';
import { Delete } from '../../../common/dialogs/delete/delete';

@Component({
  selector: 'app-table-user',
  imports: [RouterLink, Delete],
  templateUrl: './table-user.html',
  styleUrl: './table-user.css',
})
export class TableUser {
  public message = signal<string>('El Usuario');
  public users = input<User[] | null>();
  public reload = input<() => void>();
  private modalOpen = signal<boolean>(false);
  private userDelete = signal<string | null>(null);
  private readonly _authService = inject(AuthData);
  private snackBarVisible = signal<boolean>(false);

  private currentPage = signal(1);
  private readonly pageSize = 10;

  public totalPages = computed(() =>
    this.users() ? Math.ceil(this.users()!.length / this.pageSize) : 1
  );

  public paginatedTypeEvents = computed(() => {
    const all = this.users();
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
    this.userDelete.set(id);
    this.modalOpen.set(true);
  }

  public closeDialog() {
    this.userDelete.set(null);
    this.modalOpen.set(false);
  }

  public deleteConfirmUserConfirm() {
    const id = this.userDelete()!;
    this._authService.deleteUserAdmin(id).subscribe(() => {
      this.closeDialog();
      this.showSnackBarNow();
      this.reload()?.();
    });
  }

  public isModalOpen = computed(() => this.modalOpen());
  public showSnackBar = computed(() => this.snackBarVisible());

  public showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => {
      this.snackBarVisible.set(false);
    }, 4000);
  }
}
