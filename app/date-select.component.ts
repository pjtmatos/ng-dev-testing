import { Component, ElementRef, ViewChild, 
         Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'date-select',
  template:`<select id="dia" #selDia (change)="onChange_selDia()"></select>-
            <select id="mes" #selMes (change)="onChange_selMes()"></select>-
            <select id="ano" #selAno (change)="onChange_selAno()"></select>`,
  styles: [`select {max-width:45px!important; text-align-last:center}`, `option { font-family: monospace}` ]
})

export class DateSelectComponent implements AfterViewInit {

  @ViewChild('selDia') selDia:ElementRef;
  @ViewChild('selMes') selMes:ElementRef;
  @ViewChild('selAno') selAno:ElementRef;



  /*
  @ViewChild('selHora') selHora:ElementRef;
  @ViewChild('selMinutos') selMinutos:ElementRef;

  @Output() onTimeChange = new EventEmitter();

  private myDate : Date;
*/
  constructor(private rd: Renderer2)  {
    //this.myDate =  new Date();
    
  }

  ngAfterViewInit() {
    let dias = this.selDia.nativeElement;
    let anos = this.selAno.nativeElement;   
    let mes = this.selMes.nativeElement;

    let currDate = Date();

    for(let i=1;i<=31;++i){
      let opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
      dias.appendChild(opt);
    }


    for(let i=1;i<=12;++i){
      let opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
      mes.appendChild(opt);
    }

    

    for(let i=1900;i<=2050;++i){
      let opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
       
      anos.appendChild(opt);
    }

  }
/*
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
  
  */

}
