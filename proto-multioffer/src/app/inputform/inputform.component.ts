import { Component, OnInit } from '@angular/core';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Booking} from '../booking';
import { BookingService } from '../booking.service';

export interface Timeslot {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    //{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    //{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    //{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})


export class InputformComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private bookingService: BookingService) {}

  
  french() {
    //this._adapter.setLocale('fr');
  }

  inputForm : FormGroup;

  estimate: string;

  peoplecount = 1;

  formattedMessage: string;
  favoriteOffer: string;
  Offers: string[];

  selectedValue: string;
  timeslots : Timeslot[] = [
    {value: '9:00', viewValue: '9:00'},
    {value: '9:30', viewValue: '9:30'},
    {value: '10:00', viewValue: '10:00'},
    {value: '10:30', viewValue: '10:30'},
    {value: '11:00', viewValue: '11:00'},
    {value: '11:30', viewValue: '11:30'},
    {value: '12:00', viewValue: '12:00'},
    {value: '12:30', viewValue: '12:30'},
    {value: '13:00', viewValue: '13:00'},
    {value: '13:30', viewValue: '13:30'},
    {value: '14:00', viewValue: '14:00'},
    {value: '14:30', viewValue: '14:30'},
    {value: '15:00', viewValue: '15:00'},
    {value: '15:30', viewValue: '15:30'},
    {value: '16:00', viewValue: '16:00'},
    {value: '16:30', viewValue: '16:30'},
    {value: '17:00', viewValue: '17:00'},
    {value: '17:30', viewValue: '17:30'},
    {value: '18:00', viewValue: '18:00'}

  ];
  
  
  minDate :  Date;

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }


  instantornot: string;
  timeOut : string;

  startdate : Date;
  enddate : Date;
  starthour : string;
  endhour :  string;


  ngOnInit() {

    this.minDate = new Date();
    this.startdate = new Date();
    this.startdate.setDate(this.startdate.getDate()+3);
    this.enddate = this.startdate;

    this.starthour = '9:00';
    this.endhour= '13:00';
    
    this.instantornot = "notInstant";


    this.inputForm = this.formBuilder.group({ 
          startDate : this.startdate,
          startHour: this.starthour,
          endDate: this.enddate,
          endHour: this.endhour,
          what:  'Hotdesk'
        });
    
    this.Offers = ['Hotdesk', 'Private Office', 'Meeting Space', 'Seminar Space'];
    
    this.onChanges()

    this.getActualEstimate(1);

  }

  onChanges(): void {
    this.inputForm.valueChanges.subscribe(val => {
    
    //console.log(val);
    //console.log(this.peoplecount);

    this.startdate=this.inputForm.get("startDate").value;
    this.enddate=this.inputForm.get("endDate").value;
  
    

    if(this.enddate < this.startdate)
      {
      
      this.enddate  = this.startdate;
      this.inputForm.patchValue({endDate: this.enddate});
    }
   
    });
  }

  onClickInstant() {
    if(this.instantornot=="notInstant")
      {
      this.instantornot = "isInstant";
      this.Offers = ['Hotdesk'];
      this.timeOut = (((this.minDate.getHours()+1).toString()).concat(":")).concat((this.minDate.getMinutes()).toString());
      }
    else {
      this.instantornot = "notInstant";
      this.Offers = ['Hotdesk', 'Private Office', 'Meeting Space', 'Seminar Space'];  
    }
  }

  onClickDecrease() {
    
    if(this.peoplecount > 0)
      this.peoplecount = this.peoplecount-1;

  }

  onClickIncrease() {
 
    if(this.peoplecount < 20)
      {
        this.peoplecount = this.peoplecount+1;
      }
  } 

  getActualEstimate(booking_params): void {
    const id = 1;
    this.bookingService.getEstimate(booking_params).subscribe(
      estimate => {
        //console.log("Before  : ",  this.estimate);
        this.estimate=estimate.bestoffer;
        //console.log("After  : ",  this.estimate);

      }
    )
    
  }
}


