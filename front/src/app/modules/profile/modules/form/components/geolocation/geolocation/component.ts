import {
  Component,
  Injectable,
  Input,
  Output,
  EventEmitter, OnInit, ViewChild, ElementRef, NgZone,
} from '@angular/core';

declare const google: any;


@Component({
  selector: 'app-geolocation',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],

})


@Injectable()
export class ProfileGeolocationComponent implements OnInit {
  @Input() public latitude: number;
  @Input() public longitude: number;
  public zoom = 14;

  @Output() latitudeChange = new EventEmitter<number>();
  @Output() longitudeChange = new EventEmitter<number>();

  // @ViewChild('search') searchElementRef: ElementRef;

  constructor(
      // private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
  ) {}


  ngOnInit() {
    //
  }

  ngAfterViewInit() {
    this.load();
  }

  public setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.update();
      });
    }
  }

  private load() {
    // this.mapsAPILoader.load().then(() => {
    //   // console.log("got element", <HTMLInputElement>document.getElementById('searchGeolocation'))
    //
    //   const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ['address'],
    //   });
    //
    //
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       // get the place result
    //       const place = autocomplete.getPlace();
    //
    //       // verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //
    //       // set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.update();
    //     });
    //   });
    // });
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
