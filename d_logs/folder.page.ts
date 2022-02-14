import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public res: string;
  users: any;
  us: any;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private sanitizer:DomSanitizer, private geolocation: Geolocation) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit() {
    
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    let resp= this.http.get("http://92.42.47.18:8000/get")
    resp.subscribe((data)=> this.users=data);
    
  }

  doit(){
    console.log(this.users)
    for (let country of Object.keys(this.users)) {
      var capital = this.users[country];
      console.log(country, capital);
    }
  }

}




