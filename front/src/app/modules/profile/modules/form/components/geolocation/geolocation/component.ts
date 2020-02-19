import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import { filter, switchMap } from 'rxjs/operators';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { GeoDataInterface, ProfileGeoService } from '~/modules/profile/services/profile-geo.service';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/img/marker/marker-icon-2x.png',
  iconUrl: 'assets/img/marker/marker-icon.png',
  shadowUrl: 'assets/img/marker/marker-shadow.png',
});


@Component({
  selector: 'app-geolocation',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],

})
export class ProfileGeolocationComponent implements OnInit {
  @Input() parentForm: FormGroup; // with "latitude" & "longitude" controls
  private map: L.Map;
  private marker: L.Marker;
  public addressCtrl = new FormControl();

  private focusDebounceTimer;
  private selectedAddress: GeoDataInterface;
  public showMap = false;

  public foundAddresses: Observable<GeoDataInterface[]>;

  constructor(
     private _geoService: ProfileGeoService,
     private _fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initMap();

    this.foundAddresses = this.addressCtrl.valueChanges.pipe(
      filter(val => !!val),
      switchMap(value => this._geoService.findGeoDataByAddress(value)),
    );

    merge(
      this.latitudeControl.valueChanges,
      this.longitudeControl.valueChanges,
    ).subscribe((val) => {
      this.loadMapChanges();
    });

    // init lat and lon marker
    this.loadMapChanges();
  }

  ngAfterViewInit() {
    this.showMap = true;
  }

  public setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.update(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  onAddressSelect(territory: MatAutocompleteSelectedEvent) {
    clearTimeout(this.focusDebounceTimer);
    this.selectedAddress = territory.option.value;
    this.addressCtrl.setValue(territory.option.value.address);
    this.update(territory.option.value.lat, territory.option.value.lon);
  }

  public inputLostFocus() {
    clearTimeout(this.focusDebounceTimer);
    this.focusDebounceTimer = setTimeout(
      () => {
        this.addressCtrl.setValue(this.selectedAddress ? this.selectedAddress.address : '');
      },
      300);
  }

  private loadMap(coordinates: { lat: number, lon: number }) {
    this.map.setView(
      [coordinates.lat, coordinates.lon],
      15,
    );
    if (!this.marker) {
      // init marker
      this.marker = L.marker(L.latLng(coordinates.lat, coordinates.lon)).addTo(this.map);
    } else {
      this.marker.setLatLng(L.latLng(coordinates.lat, coordinates.lon));
    }
  }

  private initMap() {
    this.map = L.map('map', { minZoom: 2, maxZoom: 15, zoomControl: false }).setView(
      [45, 0],
      5.5,
    );
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
      ).addTo(this.map);
  }

  get latitudeControl(): FormControl {
    return <FormControl>this.parentForm.get('latitude');
  }

  get longitudeControl(): FormControl {
    return <FormControl>this.parentForm.get('longitude');
  }

  private update(lat: number, lon: number) {
    this.latitudeControl.setValue(lat);
    this.longitudeControl.setValue(lon);
  }

  /**
   * Detect change of latitude or longitude ( geolocation, api or address search )
   */
  private loadMapChanges() {
    this.loadMap(
      {
        lat: this.latitudeControl.value,
        lon: this.longitudeControl.value,
      },
    );
  }
}
