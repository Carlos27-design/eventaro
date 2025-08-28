import { Component, inject } from '@angular/core';
import { AuthData } from '../../../../auth/services/auth-data';
import { rxResource } from '@angular/core/rxjs-interop';
import { TableUser } from '../../../../auth/components/table-user/table-user';

@Component({
  selector: 'app-user-admin',
  imports: [TableUser],
  templateUrl: './user-admin.html',
  styleUrl: './user-admin.css',
})
export class UserAdmin {
  private readonly _authService = inject(AuthData);

  public usersResource = rxResource({
    stream: () => this._authService.getUsers(),
  });

  public reloadUsers() {
    this.usersResource.reload();
  }
}
