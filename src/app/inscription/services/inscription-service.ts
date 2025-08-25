import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../interfaces/inscription.interfaces';
import { Observable } from 'rxjs';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private readonly _http = inject(HttpClient);

  public getInscriptions(): Observable<Inscription[]> {
    return this._http.get<Inscription[]>(`${URL}/inscription`);
  }

  public getInscriptionById(id: string): Observable<Inscription> {
    return this._http.get<Inscription>(`${URL}/inscription/${id}`);
  }

  public findExistInscription(eventId: string): Observable<boolean> {
    return this._http.get<boolean>(`${URL}/inscription/exist/${eventId}`);
  }

  public createInscription(
    inscriptionLike: Partial<Inscription>
  ): Observable<Inscription> {
    return this._http.post<Inscription>(`${URL}/inscription`, inscriptionLike);
  }

  public updateInscription(id: string): Observable<Inscription> {
    return this._http.patch<Inscription>(`${URL}/inscription`, id);
  }

  public deleteInscription(id: string): Observable<Inscription> {
    return this._http.delete<Inscription>(`${URL}/inscription/${id}`);
  }
}
