import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as _ from 'lodash';

export interface GeoDataInterface {
  lat: number;
  lon: number;
  address?: string;
  city?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileGeoService {
  private addressApiDomain = 'https://api-adresse.data.gouv.fr';

  constructor(public http: HttpClient) {}

  public findGeoDataByAddress(address: string): Observable<GeoDataInterface[]> {
    const params = `/search/?q=${encodeURIComponent(address)}`;
    return this.http.get(`${this.addressApiDomain}${params}`).pipe(
      filter(response => response && response['features']),
      map((response: any) =>
        response.features
          .filter(el => _.get(el, 'geometry.coordinates', null) && _.get(el, 'properties.label', null))
          .map((el) => {
            const coordinates = _.get(el, 'geometry.coordinates');
            const label = _.get(el, 'properties.label');
            return <GeoDataInterface>{ lon: coordinates[0], lat: coordinates[1], address: label };
          }),
      ),
    );
  }

  public findGeoDataByCityName(search: string): Observable<GeoDataInterface[]> {
    const params = `/search/?q=${encodeURIComponent(search)}&type=municipality`;
    return this.http.get(`${this.addressApiDomain}${params}`).pipe(
      filter(response => response && response['features']),
      map((response: any) =>
        response.features
          .filter(el => _.get(el, 'geometry.coordinates', null) && _.get(el, 'properties.label', null))
          .map((el) => {
            const coordinates = _.get(el, 'geometry.coordinates');
            const label = _.get(el, 'properties.label');
            return <GeoDataInterface>{ lon: coordinates[0], lat: coordinates[1], city: label };
          }),
      ),
    );
  }
}
