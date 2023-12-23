import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'increment-value',
  template:`<span>{{displayValue}}</span>`,
  styles: []
})

export class IncrementValueComponent implements OnInit {

  @Input() startValue : number = 0;
  @Input() endValue: number = 100;
  @Input() stepValue: number = Math.round(Math.random() * 10);
  @Input() interval: number = 250;

  @Input() length: number = 4;
  
  value:number = 0;

  displayValue:string = '';

  constructor()  {
  }

  ngOnInit() {
    this.reset();
  }

  fill(): string {
    let retVal = '';
    let valStr =  this.value.toString();
    
    if(this.length>0){
      const fillLength = this.length - valStr.length;

      if(fillLength>0)
      {
        for(let i=0; i<=fillLength-1; ++i)
        {
          retVal += '0'; 
        }
      }    

    }

    return retVal + valStr;

  }

  reset(){

   if(this.startValue <= this.endValue){
      this.value = this.startValue;
    }
    else{
      this.value = this.endValue;
    }

    this.displayValue = this.fill();


    console.log(this.startValue);
    console.log(this.endValue);
    console.log(this.value);
    console.log(this.interval);

    var timerEvent = setInterval(() => {   
          console.log(this.value);
          if (this.value >= this.endValue) {
              clearInterval(timerEvent);
              this.value = this.endValue;
              this.displayValue = this.fill();                
              return;
          } 
          this.value += this.stepValue;
          if (this.value >= this.endValue){
            this.value = this.endValue;
          }
          this.displayValue = this.fill();   
        }, this.interval);

   
     if(this.value < this.endValue) {
         console.log('UP');
       // up
          var timerEvent = setInterval(() => {
              console.log('timer1');
              if (this.value < this.endValue) {
                  clearInterval(timerEvent);
                  return;
              }
              this.value += this.stepValue;
              this.displayValue = this.fill();
          }, this.interval);
      } else {
        // down
        var timerEvent = setInterval(() => {
          console.log(this.interval)
          if (this.value >= this.startValue) {
              clearInterval(timerEvent);
              return;
          }
          this.value -= this.stepValue;
          this.displayValue = this.fill();
        }, this.interval);
      }
  }

}
