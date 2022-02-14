import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  sanitizer: any;
  other: any;
  lat: any;
  long:any;
  time:any;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private geolocation: Geolocation) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  sendittt(){
    console.log(this.other)
   
    let resp=  this.http.get("http://92.42.47.18:8000/lat/"+this.lat+"/long/"+this.long+"/time/50000")
    resp.subscribe((data)=> this.users=data);
    
  }
  
  ngOnInit() {
    
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     


  }
  
 

}




