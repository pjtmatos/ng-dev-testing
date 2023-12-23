/**
 * Directiva para indicar que só se quer ler numeros.
 * exemplo:
 * <input OnlyNumbers [onlyInt]="true" [onlyPos]="true" />
 * 
 * só aceita inteiros positivos 
 */

import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumbers]'
})
export class OnlyNumbersDirective {

 @Input() OnlyInteger = false;
 @Input() OnlyPositive = false;
 
    // 8 - backspace
    // 9 - tab
    // 27 - escape
    // 13 - return
    // 46 - delete
    // 109 numeric -
    // 110 numeric ,
    // 188 alpha ,
    // 189 alpha -
    // 190 alpha .

  allowedKeys:number [] = [8, 9, 27, 13, 46];

  ngOnInit():any {
    if(!this.OnlyInteger)
    {
      this.allowedKeys = this.allowedKeys.concat([110, 188, 190]);
    }

    if(!this.OnlyPositive){
      this.allowedKeys = this.allowedKeys.concat([109, 189]);
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    
     if (this.allowedKeys.indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress

      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  }
}
