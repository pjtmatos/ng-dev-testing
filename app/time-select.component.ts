import { Component, ElementRef, ViewChild, 
         Renderer2, AfterViewInit, Output,
         EventEmitter } from '@angular/core';

@Component({
  selector: 'time-select',
  template:`
    <select id="hora" #selHora (change)="onChange_selHora()">
      <option value="0">00</option>
      <option value="1">01</option>
      <option value="2">02</option>
      <option value="3">03</option>
      <option value="4">04</option>
      <option value="5">05</option>
      <option value="6">06</option>
      <option value="7">07</option>
      <option value="8">08</option>  
      <option value="9">09</option>  
      <option value="10">10</option>  
      <option value="11">11</option>  
      <option value="12">12</option>  
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="11">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
    </select>:<select id="minutos" #selMinutos (change)="onChange_selMinutos()">
      <option value="0">00</option>
      <option value="5">05</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="25">25</option>
      <option value="30">30</option>
      <option value="35">35</option>  
      <option value="40">40</option>  
      <option value="45">45</option>  
      <option value="50">50</option>  
      <option value="55">55</option>  
    </select>`,
  styles: [`select {max-width:45px!important; text-align-last:center}`, `option { font-family: monospace}` ]
})

export class TimeSelectComponent implements AfterViewInit {
  
  @ViewChild('selHora') selHora:ElementRef;
  @ViewChild('selMinutos') selMinutos:ElementRef;

  @Output() onTimeChange = new EventEmitter();

  private myDate : Date;

  constructor(private rd: Renderer2)  {
    this.myDate =  new Date();
  }

  ngAfterViewInit() {
    var minutos = (Math.ceil(this.myDate.getMinutes()/5)*5) % 60;
    this.selHora.nativeElement.value = this.myDate.getHours();
    this.selMinutos.nativeElement.value = minutos; 
  }

  getTime(){
    var minutos = this.selMinutos.nativeElement.value.toString();
    var horas = this.selHora.nativeElement.value.toString();

    return horas + ':' + minutos;
  }

  getTimeInSeconds(){
    return (60 * this.selMinutos.nativeElement.value) + (3600 * this.selHora.nativeElement.value );
  }

  onChange_selHora(){
    this.onTimeChange.emit();
  }

  onChange_selMinutos(){
    this.onTimeChange.emit();
  }
  

}
