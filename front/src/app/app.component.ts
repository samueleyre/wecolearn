import { Component } from '@angular/core';

import './../assets/css/styles.css';
import './../assets/css/loader.css';
import '@angular/material/prebuilt-themes/indigo-pink.css';


@Component({
  selector: 'my-app',
  templateUrl	: 'app.template.html',
  // styleUrls : ['./../assets/css/loader.css']
})
export class AppComponent {
  title = 'mareco';
  loaded = false;
  hideloader = false;

  ngAfterViewInit() {
      setTimeout(()=>{
        this.loaded = true;
          setTimeout(()=>{
            this.hideloader = true;
          }, 1000);
      },1000);


  }
}

