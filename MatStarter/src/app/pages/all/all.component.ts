import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  movies = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers()
  }


  loadUsers() {
    let _req$ = this.http.get('api/movies');
    
    _req$.subscribe((res: any) => {
      this.movies = res;
    });
    // _req$.subscribe();
  }

}
