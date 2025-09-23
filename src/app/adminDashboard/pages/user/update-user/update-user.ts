import { Component, inject, signal } from '@angular/core';
import { UserFormUpdate } from '../../../../auth/components/user-form-update/user-form-update';
import { ActivatedRoute } from '@angular/router';
import { AuthData } from '../../../../auth/services/auth-data';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-update-user',
  imports: [UserFormUpdate],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
})
export class UpdateUser {
  public userId = signal<string>('');

  private readonly _route = inject(ActivatedRoute);
  private readonly _authService = inject(AuthData);

  constructor() {
    this.userId.set(this._route.snapshot.params['id']);
  }

  public userResource = rxResource({
    params: () => ({ id: this.userId() }),
    stream: ({ params }) => this._authService.getUserById(params.id),
  });
}
