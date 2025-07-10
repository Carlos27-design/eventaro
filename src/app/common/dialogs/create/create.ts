import { Component, output } from '@angular/core';

@Component({
  selector: 'app-create',
  imports: [],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  public close = output();
  public confirm = output();
}
