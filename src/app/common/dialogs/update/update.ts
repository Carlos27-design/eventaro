import { Component, output } from '@angular/core';

@Component({
  selector: 'app-update',
  imports: [],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update {
  public close = output();
  public confirm = output();
}
