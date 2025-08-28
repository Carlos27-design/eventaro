import { Component } from '@angular/core';
import { UserFormCreate } from '../../../../auth/components/user-form-create/user-form-create';

@Component({
  selector: 'app-create-user',
  imports: [UserFormCreate],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {}
