import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';

type AuthStatus = 'ckecking' | 'authenticated' | 'not-authenticated';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthData {
  private _authStatus = signal<string>('ckecking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token')!);

  private _http = inject(HttpClient);

  public checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  public authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  public user = computed(() => this._user());
  public token = computed(() => this._token());
  public isAdmin = computed(
    () => this._user()?.roles.includes('ADMIN') ?? false
  );

  public isOrganizer = computed(
    () => this._user()?.roles.includes('ORGANIZER') ?? false
  );

  public isUser = computed(() => this._user()?.roles.includes('USER') ?? false);

  public login(email: string, password: string): Observable<boolean> {
    return this._http
      .post<AuthResponse>(`${URL}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error) => this.handleAuthError(error))
      );
  }

  public createUserAdmin(
    fullName: string,
    email: string,
    password: string,
    role: string
  ) {
    return this._http.post(`${URL}/auth/register-admin`, {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
    });
  }

  public updateUserAdmin(
    id: string,
    fullName: string,
    email: string,
    role: string,
    password: string
  ) {
    return this._http.patch(`${URL}/auth/update-admin/${id}`, {
      fullName: fullName,
      email: email,
      role: role,
      password: password,
    });
  }

  public deleteUserAdmin(id: string) {
    return this._http.delete(`${URL}/auth/${id}`);
  }

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${URL}/auth`);
  }

  public getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${URL}/auth/${id}`);
  }

  public register(
    fullName: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this._http
      .post<AuthResponse>(`${URL}/auth/register`, {
        fullName: fullName,
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error) => this.handleAuthError(error))
      );
  }

  public checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this._authStatus.set('not-authenticated'); // marcar como no autenticado
      return of(false);
    }

    return this._http.get<AuthResponse>(`${URL}/auth/check-status`).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error) => this.handleAuthError(error))
    );
  }

  public logout() {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);

    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ user, token }: AuthResponse) {
    this._authStatus.set('authenticated');
    this._user.set(user);
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
