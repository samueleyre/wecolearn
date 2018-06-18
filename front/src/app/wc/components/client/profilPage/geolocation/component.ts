import {
    Component,
    Injectable,
    Input,
    Output,
    EventEmitter
}                             from '@angular/core';

    import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';



@Component({
    selector: 'geolocation',
    template: `
      <div class="form-group center">
        <div class="input-group">
          <span class="input-group-addon">Changer d'adresse</span>
          <input style="width: 80%; display: inline-block;" placeholder="Rechercher une adresse" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl">
          <button class="btn" type="button" (click)="setCurrentPosition()"><i class="fa fa-map-marker" aria-hidden="true"></i></button>
        </div>
      </div>
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
      </agm-map>
        
  `,
    styleUrls : ['style.scss']
})

@Injectable()
export class GeolocationComponent implements OnInit {


    @Input() public latitude: number;
    @Input() public longitude: number;

    @Output() latitudeChange = new EventEmitter<number>();
    @Output() longitudeChange = new EventEmitter<number>();

    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        if (!this.latitude) {
            this.setCurrentPosition();
        }

        this.load();

        //load Places Autocomplete

    }

    private load() {
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    // console.log("setted again", this.latitude)
                    this.update();
                    this.zoom = 12;
                });
            });
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
                this.update();
            });
        }
    }

    private update() {
        this.latitudeChange.emit(this.latitude);
        this.longitudeChange.emit(this.longitude);
    }

    // private ngOnChanges(changes:any) {
    //     console.log(changes);
    //     if (!changes.latitude.firstChange || !changes.latitude.firstChange) {
    //     console.log("yooooo", changes.longitude.currentValue);
    //         let newLongitude = changes.longitude.currentValue;
    //         let newLatitude = changes.longitude.currentValue;
    //         this.latitude = Number(newLatitude);
    //         this.longitude = Number(newLongitude);
    //         // this.load();
    //     }
    //
    // }


}
    // getGeolocation() {
    //     if(navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition(position =>
    //         {
    //             console.log("position", position);
    //         });
    //     };
    // }
