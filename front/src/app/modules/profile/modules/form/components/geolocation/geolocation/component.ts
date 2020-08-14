import {
  Component,
  Input, OnDestroy,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import { icon, Marker } from 'leaflet';

import { GeoDataInterface, ProfileGeoService } from '~/modules/profile/services/profile-geo.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import {ToastService} from "~/core/services/toast.service";

// const iconRetinaUrl = 'assets/img/marker/marker-icon-2x.png';
// const iconUrl = 'assets/img/marker/marker-icon.png';
// const shadowUrl = 'assets/img/marker/marker-shadow.png';
// const iconDefault = icon({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41],
// });
// Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-geolocation',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],

})
export class ProfileGeolocationComponent extends DestroyObservable implements OnInit {
  @Input() parentForm: FormGroup; // with "latitude" & "longitude" & "city" controls
  // private map: L.Map;
  // private marker: L.Marker;
  public addressCtrl = new FormControl();

  private focusDebounceTimer;
  private selectedAddress: GeoDataInterface;
  public showMap = false;

  public foundAddresses$: BehaviorSubject<GeoDataInterface[]> = new BehaviorSubject([]);

  constructor(
     private _geoService: ProfileGeoService,
     private _fb: FormBuilder,
     private _toast: ToastService,
  ) {
    super();
  }

  ngOnInit() {
    // this.initMap();

    this.addressCtrl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .pipe(
        debounceTime(300),
        filter(val => !!val && val.length > 2),
        switchMap(value => this._geoService.findGeoDataByCityName(value)),
      )
      .subscribe(((val) => {
        this.foundAddresses$.next(val);
      }),
    );

    // merge(
    //   this.latitudeControl.valueChanges,
    //   this.longitudeControl.valueChanges,
    // ).subscribe((val) => {
    //   this.loadMapChanges();
    // });
    //
    // // init lat and lon marker
    // this.loadMapChanges();
  }

  ngAfterViewInit() {
    this.showMap = true;
    this.addressCtrl.setValue(this.cityControl.value);
  }

  public setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.update(position.coords.latitude, position.coords.longitude, ' ');
        this._toast.success('Localisation mise à jour.');
      });
    }
  }

  onAddressSelect(territory: MatAutocompleteSelectedEvent) {
    clearTimeout(this.focusDebounceTimer);
    this.selectedAddress = territory.option.value;
    this.addressCtrl.setValue(territory.option.value.city);
    this.update(territory.option.value.lat, territory.option.value.lon, territory.option.value.city);

    // reset autocomplete items
    this.foundAddresses$.next([]);
  }

  // private loadMap(coordinates: { lat: number, lon: number }) {
  //   this.map.setView(
  //     [coordinates.lat, coordinates.lon],
  //     15,
  //   );
  //   if (!this.marker) {
  //     // init marker
  //     this.marker = L.marker(L.latLng(coordinates.lat, coordinates.lon)).addTo(this.map);
  //   } else {
  //     this.marker.setLatLng(L.latLng(coordinates.lat, coordinates.lon));
  //   }
  // }

  // private initMap() {
  //   this.map = L.map('map', { minZoom: 2, maxZoom: 15, zoomControl: false }).setView(
  //     [45, 0],
  //     5.5,
  //   );
  //   L.tileLayer(
  //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
  //     ).addTo(this.map);
  // }

  get latitudeControl(): FormControl {
    return <FormControl>this.parentForm.get('latitude');
  }

  get longitudeControl(): FormControl {
    return <FormControl>this.parentForm.get('longitude');
  }

  get cityControl(): FormControl {
    return <FormControl>this.parentForm.get('city');
  }


  private update(lat: number, lon: number, city: string) {
    this.latitudeControl.setValue(lat);
    this.longitudeControl.setValue(lon);
    this.cityControl.setValue(city);
  }

  // /**
  //  * Detect change of latitude or longitude ( geolocation, api or address search )
  //  */
  // private loadMapChanges() {
  //   this.loadMap(
  //     {
  //       lat: this.latitudeControl.value,
  //       lon: this.longitudeControl.value,
  //     },
  //   );
  // }
}
