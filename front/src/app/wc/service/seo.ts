import {Injectable} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {environment} from "../../applicativeService/config/environment";

@Injectable()
export class SeoService {
  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string) {
    if (title === "main") title = "WeColearn";
    this.title.setTitle(title);
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  updateIco(domain: string) {
    document.getElementById("favicon").setAttribute('href', environment.publique+"/logo/"+ domain + ".ico");
  }
}