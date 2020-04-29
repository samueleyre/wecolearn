import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../../../../environments/environment';

export interface GeoDataInterface {
  lat: number;
  lon: number;
  address?: string;
  city?: string;
  country?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileGeoService {
  private addressApiDomainAlgolia = `https://places-de-1.algolianet.com/1/places/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.27.1%3BAlgolia%20Places%201.7.2&x-algolia-application-id=pl0RXDOYZVRU&x-algolia-api-key=${environment.mapApiKey}`;

  constructor(public http: HttpClient) {}

  public findGeoDataByCityName(search: string): Observable<GeoDataInterface[]> {
    return this.http.post(
      `${this.addressApiDomainAlgolia}`,
      {
        hitsPerPage: 5,
        language: 'fr',
        query: search,
        type: 'city',
      }).pipe(
      filter(response => response && response['hits']),
      map((response: any) =>
        response.hits
          .filter(el =>
            _.get(el, '_geoloc', null) &&
            _.get(el, 'locale_names[0]', null) &&
            _.get(el, 'country', null),
          )
          .map((el) => {
            const coordinates = _.get(el, '_geoloc');
            const city = _.get(el, 'locale_names[0]');
            const country = _.get(el, 'country');
            return <GeoDataInterface>{ city, country, lon: coordinates.lng, lat: coordinates.lat };
          }),
      ),
    );
  }
}
