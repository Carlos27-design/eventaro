import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { Events } from '../../interfaces/event';
import { EventService } from '../../services/event-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeEventService } from '../../../typeEvent/services/type-event';
import { OrganizationService } from '../../../organization/services/organization-service';
import { TypeEvent } from '../../../typeEvent/interfaces/type-event';
import { Organization } from '../../../organization/interfaces/organization';
import { combineLatest } from 'rxjs';
import { EventImagePipe } from '../../pipes/event-image-pipe';
import { Update } from '../../../common/dialogs/update/update';
import { Router } from '@angular/router';

@Component({
  selector: 'form-update-events',
  imports: [ReactiveFormsModule, EventImagePipe, Update],
  templateUrl: './form-update-events.html',
  styleUrl: './form-update-events.css',
})
export class FormUpdateEvents {
  private dialogOpen = signal(false);
  private typeEvents = signal<TypeEvent[]>([]);
  private organizations = signal<Organization[]>([]);
  private snackBarVisible = signal(false);
  private readonly _router = inject(Router);
  private readonly _typeEventService = inject(TypeEventService);
  private readonly _organizationService = inject(OrganizationService);
  private readonly _eventService = inject(EventService);
  private readonly _formBuilder = inject(FormBuilder);

  public event = input<Events>();

  public imageFileList: FileList | undefined = undefined;
  public tempImages = signal<string[]>([]);

  public typeEventsLoad = computed(() => this.typeEvents());
  public organizationsLoad = computed(() => this.organizations());
  public showDialog = computed(() => this.dialogOpen());
  public showSnackBar = computed(() => this.snackBarVisible());

  public eventForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    initialDate: ['', [Validators.required]],
    finalDate: ['', [Validators.required]],
    ubication: ['', [Validators.required, Validators.minLength(3)]],
    typeEventId: ['', [Validators.required]],
    organizationId: ['', [Validators.required]],
    images: this._formBuilder.control<string[] | null>(null),
  });

  constructor() {
    effect(() => {
      const value = this.event();
      if (value) this.setFormValues(value);
    });
  }

  ngOnInit() {
    this.getData();
  }

  public openDialog() {
    if (this.eventForm.valid) this.dialogOpen.set(true);
  }

  public closeDialog() {
    this.dialogOpen.set(false);
  }

  public showSnackBarNow() {
    this.snackBarVisible.set(true);
    setTimeout(() => this.snackBarVisible.set(false), 4000);
  }

  public onFilesChanged(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;

    const imagesUrls = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.tempImages.set(imagesUrls);
  }

  public onSubmit() {
    const isValid = this.eventForm.valid;
    if (!isValid) return;

    const formValue = this.eventForm.value;

    const eventLike: Partial<Events> = formValue as any;

    this._eventService
      .updateEvent(this.event()!.id, eventLike, this.imageFileList!)
      .subscribe(() => {
        this.dialogOpen.set(false);
        this.showSnackBarNow();
        this._router.navigate(['/admin/events']);
      });
  }

  private setFormValues(event: Events) {
    this.eventForm.patchValue({
      name: event.name,
      description: event.description,
      initialDate: this.formatDate(event.initialDate),
      finalDate: this.formatDate(event.finalDate),
      ubication: event.ubication.name,
      typeEventId: event.typeEvent.id,
      organizationId: event.organization.id,
    });

    this.tempImages.set(event.images);
  }

  private getData() {
    combineLatest([
      this._typeEventService.getTypeEvents(),
      this._organizationService.getOrganizations(),
    ]).subscribe(([typeEvents, organizations]) => {
      this.typeEvents.set(typeEvents);
      this.organizations.set(organizations);
    });
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
