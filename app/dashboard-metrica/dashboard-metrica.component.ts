import {  Component, OnInit, Directive, ElementRef, HostListener, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'dashboard-metrica',
  templateUrl: './dashboard-metrica.component.html',
  styleUrls: ['./dashboard-metrica.component.css']
})
export class DashboardMetricaComponent implements OnInit {

@Input() ValorMetrica = "VALOR";
@Input() NomeMetrica = "Nome Metrica";
@Input() BackgroundColor: any;

@Input() IconClass: any;

  constructor() { }

  ngOnInit() {
  }

}