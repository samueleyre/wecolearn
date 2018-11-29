import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { IEntity } from '../applicativeService/entity/interface';
import { FilterService } from '../applicativeService/filter/service';

export class GPPDService {
  route = '/api';
  constructor( protected http: HttpClient ) {}
  setApi(route: string ) {
    this.route = route;
  }
  get(): Observable<IEntity[]> {
    const params = FilterService.getUrlParams();
    return this.http.get(`${this.route}${params}`).map((response: any) => {
      // console.log(response);
      return response;
    });
  }

  getOne(): Observable<IEntity> {
		
		let params = FilterService.getUrlParams();

		return this.http.get(`${this.route}${params}`).map((response: any) => {
				// console.log(response);
				return response;
			})
		;
	}

	

	patch(entity: any ): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();

		return this.http.patch(`${this.route}${params}`, entity).map((response: any) => {
				return response;
			})
		;
	}

	patchOne(entity: any ): Observable<IEntity> {
		
		let params = FilterService.getUrlParams();

		return this.http.patch(`${this.route}${params}`, entity).map((response: any) => {
				return response;
			})
		;
	}

	post( entity:any ): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();

		return this.http.post(`${this.route}${params}`, entity).map((response: any) => {
				return response;
			})
		;
	}

	delete(id: any  ): Observable<IEntity[]> {
		
		let params = FilterService.getUrlParams();

		return this.http.delete(`${this.route}/${id}${params}`).map((response: any) => {
				return response;
			})
		;
	}
}