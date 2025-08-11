import { Component, computed, inject, input, signal } from '@angular/core';
import { Organization } from '../../interfaces/organization';
import { OrganizationService } from '../../services/organization-data';
import { Router, RouterLink } from '@angular/router';
import { Delete } from '../../../common/dialogs/delete/delete';

@Component({
  selector: 'app-organization-table',
  imports: [RouterLink, Delete],
  templateUrl: './organization-table.html',
  styleUrl: './organization-table.css',
})
export class OrganizationTable {
  public message = signal<string>('la Organización');
  public organizations = input<Organization[] | null>();
  public reload = input<() => void>();

  private modalOpen = signal<boolean>(false);
  private organizationDelete = signal<string | null>(null);
  private snackBarVisible = signal<boolean>(false);

  private currentPage = signal(1);
  private readonly pageSize = 10;
  private readonly _organizationService = inject(OrganizationService);

  public totalPages = computed(() =>
    this.organizations()
      ? Math.ceil(this.organizations()!.length / this.pageSize)
      : 1
  );

  public paginatedOrganizations = computed(() => {
    const all = this.organizations();
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
    this.organizationDelete.set(id);
    this.modalOpen.set(true);
  }

  public closeDialog() {
    this.organizationDelete.set(null);
    this.modalOpen.set(false);
  }

  public deleteOrganizationConfirm() {
    if (this.organizationDelete()) {
      const id = this.organizationDelete()!;

      this._organizationService.deleteOrganization(id).subscribe(() => {
        this.closeDialog();
        this.showSnackBarNow();

        this.reload()?.();
      });
    }
  }

  public isModalOpen = computed(() => this.modalOpen());
  public showSnackBar = computed(() => this.snackBarVisible());

  public showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }
}
