import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Events } from '../interfaces/event';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly _http = inject(HttpClient);

  public getEvents(): Observable<Events[]> {
    return this._http.get<Events[]>(`${URL}/event`);
  }

  public getEventById(id: string): Observable<Events> {
    return this._http.get<Events>(`${URL}/event/${id}`);
  }

  public getEventsByTypeEvent(name: string): Observable<Events[]> {
    return this._http.get<Events[]>(`${URL}/event/search/${name}`);
  }

  public getEventsAdmin(): Observable<Events[]> {
    return this._http.get<Events[]>(`${URL}/event/admin`);
  }

  public createEvent(
    eventLike: Partial<Events>,
    imageFileList: FileList
  ): Observable<Events> {
    const currentImages = eventLike.images || [];

    return this.uploadImages(imageFileList).pipe(
      map((imageName) => ({
        ...eventLike,
        images: [...currentImages, ...imageName],
      })),
      switchMap((event) => this._http.post<Events>(`${URL}/event`, event))
    );
  }

  public updateEvent(
    id: string,
    eventLike: Partial<Events>,
    imageFileList?: FileList
  ): Observable<Events> {
    const currentImages = eventLike.images || [];

    return this.uploadImages(imageFileList).pipe(
      map((imageName) => ({
        ...eventLike,
        images: [...currentImages, ...imageName],
      })),
      switchMap((updatedEvent) =>
        this._http.patch<Events>(`${URL}/event/${id}`, updatedEvent)
      )
    );
  }

  public deleteEvent(id: string): Observable<Events> {
    return this._http.delete<Events>(`${URL}/event/${id}`);
  }

  private uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);

    const uploadObservables = Array.from(images).map((imageFile) =>
      this.uploadImage(imageFile)
    );

    return forkJoin(uploadObservables);
  }

  private uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this._http
      .post<{ fileName: string }>(`${URL}/files/event`, formData)
      .pipe(map((resp) => resp.fileName));
  }
}
