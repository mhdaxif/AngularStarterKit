import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ShortcutsComponent } from './components/shortcuts/shortcuts.component';
import { HomeComponent } from './pages/home/home.component';
import { AllComponent } from './pages/all/all.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './components/cards/cards.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

const kendoModules = [
  MatSliderModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
]
@NgModule({
  declarations: [
    AppComponent,
    ShortcutsComponent,
    HomeComponent,
    AllComponent,
    CardsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    kendoModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
