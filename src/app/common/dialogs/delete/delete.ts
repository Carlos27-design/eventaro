import { Component, output } from '@angular/core';

@Component({
  selector: 'app-delete',
  imports: [],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete {
  public close = output();
  public confirm = output();
}
