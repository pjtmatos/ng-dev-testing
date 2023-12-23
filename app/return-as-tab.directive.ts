/**
 * Directiva para tratar return como tab
 * 
 * Exemplo: <input ReturnAsTab/>
 */

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ReturnAsTab]'
})
export class ReturnAsTabDirective {

  constructor(private _elem: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;    
    // Go to next form element on enter and only for included tags
    console.log(this._elem.nativeElement.parentElement);
    if (e.keyCode === 13) {

        // encontra todos os elementos que podem receber focus
        var focusable = this._elem.nativeElement.parentElement.querySelectorAll('input,select,button,textarea,a');

        // retorna o index do elemento o foco 
        var currentIndex = Array.prototype.indexOf.call(focusable, e.target)

        // calcula o indice do novo elemento
        var nextIndex = currentIndex == focusable.length - 1 ? 0 : currentIndex + 1;

        // coloca o foco no novo elemento
        if(nextIndex >= 0 && nextIndex < focusable.length)
            focusable[nextIndex].focus();

        return false;
    }
    return true;
  }

}
