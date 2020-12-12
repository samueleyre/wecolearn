import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap, throttle, throttleTime } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { GeoDataInterface, ProfileGeoService } from '~/modules/profile/services/profile-geo.service';

interface CityInterface {
  name: string;
  position: {
    lat: number,
    lon: number,
    city: string,
  };
}

@Component({
  selector: 'app-profile-form-city',
  templateUrl: './profile-form-city.component.html',
  styleUrls: ['./profile-form-city.component.scss'],
})
export class ProfileFormCityComponent implements OnInit {
  @Input() parentForm: FormGroup; // with latitude & longitude

  // city search
  public foundCities: Observable<GeoDataInterface[]>;
  private focusDebounceTimer;
  public cityCtrl = new FormControl();
  public selectedSearchedCity: GeoDataInterface;

  // cities
  public selectedCity = new FormControl();
  public cities: CityInterface[] = [
    {
      name: 'Lyon',
      position: {
        lat: 45.75,
        lon: 4.85,
        city: 'Lyon',
      },
    },
    {
      name: 'Paris',
      position: {
        lat: 15,
        lon: 16,
        city: 'Paris',
      },
    },
    {
      name: 'Autre',
      position: {
        lat: null,
        lon: null,
        city: null,
      },
    },
  ];

  constructor(private _geoService: ProfileGeoService) {
  }

  ngOnInit() {
    this.foundCities = this.cityCtrl.valueChanges.pipe(
      debounceTime(300),
      filter(val => !!val && val.length > 3),
      switchMap(value => this._geoService.findGeoDataByCityName(value)),
    );
    this.selectedCity.valueChanges.subscribe((val) => {
      this.updateParentForm(val.position);
    });
    this.initCity();
  }

  initCity() {
    const cityName = this.parentForm.get('city').value;
    const city: CityInterface = {
      name: (cityName === 'Lyon' || cityName === 'Paris') ? cityName : 'Autre',
      position: {
        lat: Number(this.parentForm.get('latitude').value),
        lon: Number(this.parentForm.get('longitude').value),
        city: this.parentForm.get('city').value,
      },
    };
    if (city.name && city.position.lat && city.position.lon) {
      this.selectedCity.setValue(city);
      if (city.name === 'Autre') {
        this.selectedSearchedCity = city.position;
        this.cityCtrl.setValue(city.position.city);
      }
    }
  }

  onCitySelect(city: MatAutocompleteSelectedEvent) {
    clearTimeout(this.focusDebounceTimer);
    this.selectedSearchedCity = city.option.value;
    this.cityCtrl.setValue(city.option.value.city);
    this.updateParentForm({
      lat: city.option.value.lat,
      lon: city.option.value.lon,
      city: city.option.value.city,
    });
  }

  public get showCityFields():boolean {
    return this.selectedCity.value && this.selectedCity.value.name === 'Autre';
  }

  public inputLostFocus() {
    clearTimeout(this.focusDebounceTimer);
    this.focusDebounceTimer = setTimeout(
      () => {
        this.cityCtrl.setValue(this.selectedSearchedCity ? this.selectedSearchedCity.city : '');
      },
      300);
  }

  updateParentForm(val: CityInterface['position']) {
    this.parentForm.get('latitude').setValue(val.lat);
    this.parentForm.get('longitude').setValue(val.lon);
    this.parentForm.get('city').setValue(val.city);
  }
}
