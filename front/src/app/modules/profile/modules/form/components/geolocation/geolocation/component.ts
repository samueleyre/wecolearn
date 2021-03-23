import {
  Component,
  Input, OnDestroy,
  OnInit,
} from '@angular/core';
import { debounceTime, filter, skip, switchMap, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { GeoDataInterface, ProfileGeoService } from '~/modules/profile/services/profile-geo.service';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { ToastService } from '~/core/services/toast.service';


@Component({
  selector: 'app-geolocation',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],

})
export class ProfileGeolocationComponent extends DestroyObservable implements OnInit {
  @Input() parentForm: FormGroup; // with "latitude" & "longitude" & "city" controls
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
    this.addressCtrl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .pipe(
        skip(1),
        debounceTime(300),
        filter(val => !!val && val.length > 2),
        switchMap(value => this._geoService.findGeoDataByCityName(value)),
      )
      .subscribe(((val) => {
        this.foundAddresses$.next(val);
      }),
    );
  }

  ngAfterViewInit() {
    this.showMap = true;
    this.addressCtrl.setValue(this.cityControl.value);
  }

  public setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.update(position.coords.latitude, position.coords.longitude, ' ');
        this.addressCtrl.setValue(' ');
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
    this.latitudeControl.setValue(lat.toFixed(2));
    this.longitudeControl.setValue(lon.toFixed(2));
    this.cityControl.setValue(city);
  }
}
