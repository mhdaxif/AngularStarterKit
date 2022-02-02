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

  data: any = {}
  ngOnInit() {
    this.http.get("api/users").subscribe(res => { 
      this.data["users"] = res;
    });
  
    this.http.get("api/movies").subscribe(res => { 
     this.data["movies"] = res;
    });
    
    this.http.get("api/movies/3").subscribe(res => { 
     this.data["single-movie"] = res;
    });
    
    this.http.get("api/todos").subscribe(res => { 
     this.data["todos"] = res;
    });
  }
}
