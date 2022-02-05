import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() movies: any[] = [];
  constructor(private dialog: MatDialog, private http: HttpClient) { }



  ngOnInit(): void {
  }

  openDialog(item: any) {
    this.http.get(`api/movies/${item.id}`).subscribe(x => {
      this.dialog.open(DialogComponent, {
        data: x,
      }); 
    })

  }
} 