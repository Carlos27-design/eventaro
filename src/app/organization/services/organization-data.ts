import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../interfaces/organization';

const URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private readonly _http = inject(HttpClient);

  public getOrganizations(): Observable<Organization[]> {
    return this._http.get<Organization[]>(`${URL}/organization`);
  }

  public getOrganizationById(id: string): Observable<Organization> {
    return this._http.get<Organization>(`${URL}/organization/${id}`);
  }

  public createOrganization(
    organizationLike: Partial<Organization>
  ): Observable<Organization> {
    return this._http.post<Organization>(
      `${URL}/organization`,
      organizationLike
    );
  }

  public updateOrganization(
    id: string,
    organizationLike: Partial<Organization>
  ): Observable<Organization> {
    return this._http.put<Organization>(
      `${URL}/organization/${id}`,
      organizationLike
    );
  }

  public deleteOrganization(id: string): Observable<Organization> {
    return this._http.delete<Organization>(`${URL}/organization/${id}`);
  }
}
