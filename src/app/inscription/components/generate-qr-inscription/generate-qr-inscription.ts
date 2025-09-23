import { MarkerOptions } from './../../../../../node_modules/mapbox-gl/dist/mapbox-gl.d';
import { Component, input, signal } from '@angular/core';
import { Inscription } from '../../interfaces/inscription.interfaces';
import { QRCodeComponent } from 'angularx-qrcode';
import { DatePipe } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-generate-qr-inscription',
  imports: [QRCodeComponent, DatePipe],
  templateUrl: './generate-qr-inscription.html',
  styleUrl: './generate-qr-inscription.css',
})
export class GenerateQrInscription {
  public inscription = input<Inscription>();

  map!: mapboxgl.Map;

  private mapboxToken = environment.mapBoxToken;

  private lng = signal<number | undefined>(undefined);
  private lat = signal<number | undefined>(undefined);

  ngAfterViewInit(): void {
    if (!this.inscription()?.event.ubication) return;

    this.lng.set(this.inscription()?.event?.ubication?.longitude);
    this.lat.set(this.inscription()?.event?.ubication?.latitude);

    if (this.lng() === undefined || this.lat() === undefined) return;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.lng()!, this.lat()!],
      zoom: 14,
      accessToken: this.mapboxToken,
      interactive: false,
    });

    new mapboxgl.Marker({
      draggable: false,
    })
      .setLngLat([this.lng()!, this.lat()!])
      .addTo(this.map);

    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
