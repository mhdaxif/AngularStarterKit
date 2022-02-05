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
  constructor(private dialog: MatDialog) { }



  ngOnInit(): void {
  }

  openDialog(item: any) {
    console.log(item)
    this.dialog.open(DialogComponent, {
      data: item,
    });
  }
} 