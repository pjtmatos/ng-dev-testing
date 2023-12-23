import { Component, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';

import { TimeSelectComponent} from './time-select.component';
import { SingleRadioMultipleField, RadioOptionItem} from './SingleRadioMultipleField'

import { IncrementValueComponent } from './increment-value.component';

export class Model {
  Pay1One:boolean;
  Pay2Two:boolean;
  Pay3Tree:boolean;
}



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers:[]
})

export class AppComponent implements OnInit {

  @ViewChild('time1') time1: TimeSelectComponent;
  @ViewChild('incr') incr: IncrementValueComponent;


  

  meVal = new  Model();

  SelectOne : SingleRadioMultipleField;

  Form: FormGroup;

  ngOnInit(){
    this.meVal.Pay1One = false;
    this.meVal.Pay2Two= false;
    this.meVal.Pay3Tree = false;

    this.Form = new FormGroup({
      PayWhat: new FormControl('')
    });

    this.SelectOne = new SingleRadioMultipleField(this.Form.get("PayWhat"),
    this.meVal, [new RadioOptionItem("1", "Pay1One"),
    new RadioOptionItem("2", "Pay2Two"),
    new RadioOptionItem("3", "Pay3Tree")]);
    
    this.Form.get("PayWhat").setValue("1");

  }


   

  clickme(){
   this.incr.reset();
  }
 
}
