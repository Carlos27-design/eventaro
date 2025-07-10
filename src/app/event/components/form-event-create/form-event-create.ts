import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Create } from '../../../common/dialogs/create/create';
import { Events } from '../../interfaces/event';
import { TypeEventService } from '../../../typeEvent/services/type-event';
import { TypeEvent } from '../../../typeEvent/interfaces/type-event';
import { OrganizationService } from '../../../organization/services/organization-service';
import { Organization } from '../../../organization/interfaces/organization';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'form-event-create',
  imports: [Create, ReactiveFormsModule],
  templateUrl: './form-event-create.html',
  styleUrl: './form-event-create.css',
})
export class FormEventCreate {
  private dialogOpen = signal(false);

  private readonly _typeEventService = inject(TypeEventService);
  private snackBarVisible = signal(false);
  private readonly _organizationService = inject(OrganizationService);
  private readonly _router = inject(Router);
  private readonly _eventService = inject(EventService);
  private readonly _formBuilder = inject(FormBuilder);

  public wasSaved = signal(false);
  public imageFileList: FileList | undefined = undefined;
  public tempImages = signal<string[]>([]);

  private typeEvents = signal<TypeEvent[]>([]);
  private organizations = signal<Organization[]>([]);

  public showDialog = computed(() => this.dialogOpen());

  public eventForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    initialDate: ['', [Validators.required]],
    finalDate: ['', [Validators.required]],
    ubication: ['', [Validators.required, Validators.minLength(3)]],
    typeEventId: ['', [Validators.required]],
    organizationId: ['', [Validators.required]],
    images: [[]],
  });

  ngAfterViewInit() {
    this.init();
  }

  public openDialog() {
    if (this.eventForm.valid) {
      this.dialogOpen.set(true);
    }
  }

  public closeDialog() {
    this.dialogOpen.set(false);
  }

  private init() {
    combineLatest([
      this._typeEventService.getTypeEvents(),
      this._organizationService.getOrganizations(),
    ]).subscribe(([typeEvents, organizations]) => {
      this.typeEvents.set(typeEvents);
      this.organizations.set(organizations);
    });
  }

  public typeEventsLoad = computed(() => this.typeEvents());
  public organizationsLoad = computed(() => this.organizations());

  public showSnackBar = computed(() => this.snackBarVisible());

  public showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }

  public onSubmit() {
    const isValid = this.eventForm.valid;
    if (!isValid) return;

    const formValue = this.eventForm.value;

    const eventLike: Partial<Events> = formValue as any;

    this._eventService
      .createEvent(eventLike, this.imageFileList!)
      .subscribe(() => {
        this.dialogOpen.set(false);
        this.wasSaved.set(true);
        this.showSnackBarNow();
        this._router.navigate(['/admin/events']);
      });
  }

  public onFilesChanged(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;

    const imagesUrls = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.tempImages.set(imagesUrls);
  }
}
