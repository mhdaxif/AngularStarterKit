import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent implements OnInit {
  @Input() links: any[] = [];
  constructor(private router: Router) { }
  ngOnInit(): void { }

  navigate(route: string){
    console.log(route)
    // this.router.navigate[route]
    this.router.navigate([route]);
  }

}
