import {
    Component,
    OnInit,
    Injectable
}                             from '@angular/core';


import {Router, ActivatedRoute, Params} from '@angular/router';




@Component({
    selector: 'geolocation',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class GeolocationComponent implements OnInit {



    constructor(private activatedRoute: ActivatedRoute ) {
    }

    ngOnInit() {

        this.load();
    }

    load() : void {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>
            {
                console.log("position", position);
            });
        };
    }

    getGeolocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>
            {
                console.log("position", position);
            });
        };
    }



}