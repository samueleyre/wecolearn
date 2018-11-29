import {
  Component,
  Injectable,
  Input,
  Output,
  EventEmitter, Renderer2
} from '@angular/core';

import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';


declare const google: any;




@Component({
    selector: 'app-geolocation',
    template: `
      <!--<searchOsm (latitude)="latitude" (longitude)="longitude"></searchOsm> // This does not work to search specific address, only cities -->
      <div [hidden]="!editing" class="form-group center">
        <div class="input-group">
          <span class="input-group-addon">Changer d'adresse</span>
          <input id="searchGeolocation" style="width: 80%; display: inline-block;" placeholder="Rechercher une adresse" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search >
          </div>
        <div class="input-group" style="margin-top: 8px;">
          <button class="btn btn-outline-dark" type="button" (click)="setCurrentPosition()"> Se géolocaliser <i class="fa fa-map-marker" aria-hidden="true"></i></button>
        </div>
      </div>
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
            <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
      </agm-map>
    `,
    styleUrls : ['style.scss'],

})



@Injectable()
export class GeolocationComponent implements OnInit {


  @Input() public latitude: number;
  @Input() public longitude: number;
  @Input() public editing: boolean;
  @Input() public firstTime: boolean;
  public zoom = 14;

  @Output() latitudeChange = new EventEmitter<number>();
  @Output() longitudeChange = new EventEmitter<number>();

  @ViewChild('search') searchElementRef: ElementRef;

  constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone
  ) {}



  ngOnInit() {
  }

  ngAfterViewInit() {

    this.load();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.update();
      });
    }
  }

  private load() {


    this.mapsAPILoader.load().then(() => {

      // console.log("got element", <HTMLInputElement>document.getElementById('searchGeolocation'))

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });


      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.update();
        });
      });
    });

  }

  private update() {
      this.latitudeChange.emit(this.latitude);
      this.longitudeChange.emit(this.longitude);
  }

    // private ngOnChanges(changes:any) {
    //     console.log(changes);
    //     if (!changes.latitude.firstChange || !changes.latitude.firstChange) {
    //         let newLongitude = changes.longitude.currentValue;
    //         let newLatitude = changes.longitude.currentValue;
    //         this.latitude = Number(newLatitude);
    //         this.longitude = Number(newLongitude);
    //         // this.load();
    //     }
    //
    // }


}
