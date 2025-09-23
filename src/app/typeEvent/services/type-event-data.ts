import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TypeEvent } from '../interfaces/type-event';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class TypeEventService {
  private readonly _http = inject(HttpClient);

  public getTypeEvents(): Observable<TypeEvent[]> {
    return this._http.get<TypeEvent[]>(`${URL}/type-event`);
  }

  public getTypeEventById(id: string): Observable<TypeEvent> {
    return this._http.get<TypeEvent>(`${URL}/type-event/${id}`);
  }

  public createTypeEvent(
    typeEventLike: Partial<TypeEvent>
  ): Observable<TypeEvent> {
    return this._http.post<TypeEvent>(`${URL}/type-event`, typeEventLike);
  }

  public updateTypeEvent(
    id: string,
    typeEventLike: Partial<TypeEvent>
  ): Observable<TypeEvent> {
    return this._http.patch<TypeEvent>(
      `${URL}/type-event/${id}`,
      typeEventLike
    );
  }

  public deleteTypeEvent(id: string): Observable<TypeEvent> {
    return this._http.delete<TypeEvent>(`${URL}/type-event/${id}`);
  }
}
