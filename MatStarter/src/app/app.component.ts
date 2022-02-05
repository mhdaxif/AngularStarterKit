import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MatStarter';
 
  links = [
    { title: 'Components', url: '/comps' },
    { title: 'Home', url: '/' },
  ]
}
