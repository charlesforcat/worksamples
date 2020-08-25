import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


import {MAT_DATE_LOCALE} from '@angular/material/core';

import { MatNativeDateModule, MatCardModule } from '@angular/material';
import { MatSelectModule, MatInputModule } from '@angular/material';



import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InputformComponent } from './inputform/inputform.component';



@NgModule({
  declarations: [
    AppComponent,
  
    InputformComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    MomentDateModule,
    MatNativeDateModule, MatCardModule,
    MatDatepickerModule,
    MatSelectModule, MatInputModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule,
    MatFormFieldModule,
    AppRoutingModule
  ],
  providers: [MatDatepickerModule,

  { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }}
  ],  
  bootstrap: [AppComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  
})
export class AppModule { }
