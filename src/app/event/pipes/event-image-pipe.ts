import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'eventImage',
})
export class EventImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    if (value === null) {
      return './assets/images/no-image.jpg';
    }

    if (typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }

    if (typeof value === 'string') {
      return `${baseUrl}/files/event/${value}`;
    }

    const images = value.at(0);

    if (!images) {
      return './assets/images/no-image.jpg';
    }

    return `${baseUrl}/files/event/${images}`;
  }
}
