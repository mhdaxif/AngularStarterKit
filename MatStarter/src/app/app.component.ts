import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MatStarter'; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("api/users").subscribe(res => { 
      console.log(res);
    });
  
    this.http.get("api/movies/2").subscribe(res => { 
      console.log(res);
    });
  }
}
