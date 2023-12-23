/**
 */

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/*
0	48
1	49
2	50
3	51
4	52
5	53
6	54
7	55
8	56
9	57

numpad0	96
numpad1	97
numpad2	98
numpad3	99
numpad4	100
numpad5	101
numpad6	102
numpad7	103
numpad8	104
numpad9	105
*/


@Directive({
  selector: '[TimeInput]'
})
export class TimeInputDirective {

  @Input() AutoFocusNext = false;
  @Input() AutoSeparator = true;
 
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
    // 190 + shift :

    // arrow left = 37
    // arrow up = 38
    // arrow right = 39
    // arrow down = 40

  allowedKeys:number [] = [8, 9, 27, 13, 46, 37, 38, 39, 40];

  afterKeyDown = false;

  // regex time format validation
  validTime = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3])?(:([0-9]|[0-5][0-9])?)?$');
  

  constructor(private el: ElementRef) { }

  ngOnInit():any {
    this.el.nativeElement.placeholder = 'hh:mm';
    this.el.nativeElement.autocomplete = 'off'; // desligar o autocomplete
  }

  /*
   * Verify if component text is selected
   */
  private IsTextSelected(): boolean{
    return (window.getSelection().toString().length>0);
  }

  private IsKeyNotNumber(e) : boolean {
    return (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105);
  }

  private MaxLength(value : any) : any{
    var maxLength = 5; // max size for hh:mm

    // if : is present recheck maxlength based on total chars before : and total allowed after
    if(value.match('\:') !== null){
      var countTimeSeparator = value.match('\:').length;
      console.log(value);
      if(countTimeSeparator >= 1)
      {
        maxLength = value.indexOf(':') + 3; // index of : plus + 1 and add the two allowed for minutes
       

        var validateMinutes = value.split(':')[1];
        var invalidNumbers = new RegExp('[6-9]'); 
        // don't allow things like 60 minutes, 71 minutes...
        if(invalidNumbers.test(validateMinutes)){
          maxLength = value.indexOf(':') + 2;
        }
        
      }
    } else {
        var validHourFirstDigit = new RegExp('[0-2]');
        maxLength = 2;
        if(!validHourFirstDigit.test(value)){
          maxLength = 1;
        }
    }
    return maxLength;
  }

  private IsValidToAutoFocus(value, e) : boolean {

    return this.AutoFocusNext &&  
           this.validTime.test(this.el.nativeElement.value) && 
           this.el.nativeElement.value.length >= 3 && 
           this.el.nativeElement.value.length >= this.MaxLength(this.el.nativeElement.value);
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    this.afterKeyDown = true;

    let value = this.el.nativeElement.value;
    
     if (this.allowedKeys.indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Sift + . --> :
      // se já tiver : não deixar
      (e.keyCode === 190 && (e.shiftKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)){
        //  :
       if(e.keyCode === 190 && (e.shiftKey || e.metaKey)){
          // only allow one entry of : 
          if(!((value.length>=1) && (value.indexOf(':') <=0))){
            event.preventDefault();
            return;
          }            
        }

        // let it happen, don't do anything
        return;
      }

      if (this.IsKeyNotNumber(e)) {
        event.preventDefault();
        return;
      }


     // if all checks fail is an invalid key, size or format error, discard key
      let isInvalid = (value.length >= this.MaxLength(value)) && !this.IsTextSelected();

      if (this.IsKeyNotNumber(e) || isInvalid) {
        event.preventDefault();
        return;
      }


  }

 @HostListener('keyup', ['$event']) onkeyup(event) {
    let e = <KeyboardEvent> event; 
    
    if(this.allowedKeys.indexOf(e.keyCode) !== -1 ){
      // ok, just ignore and allow
      return;
    }

    if(window.getSelection().toString().length>0){
      // ok, just ignore and allow
      return;
    }

    var value = this.el.nativeElement.value;

    if(this.AutoSeparator){
      // add  : if flag active and already have 2 numbers and no :
      if( (value.length  === 2) && (value.indexOf(':') < 0) ){
        this.el.nativeElement.value += ':';
        this.afterKeyDown = false;
        return;
      }
    
    }

    // just allow after keydown, every other ignore
    if(!this.afterKeyDown)
    {
      e.preventDefault();
      return;
    }
    
    this.afterKeyDown = false;

    // focus next
    if(this.IsValidToAutoFocus(value, e)) {
       // find all focusable elements on parent
        var focusable = this.el.nativeElement.parentElement.querySelectorAll('input,select,button,textarea,a, iframe, area');

        // get current tabIndex
        var currentIndex = Array.prototype.indexOf.call(focusable, e.target)

        //get the next tabIndex
        var nextIndex = currentIndex == focusable.length - 1 ? 0 : currentIndex + 1;

        // set focus to next tabIndex element
        if(nextIndex >= 0 && nextIndex < focusable.length)
            focusable[nextIndex].focus();
    }
  }

  /* prevent paste of invalid information */
  @HostListener('paste', ['$event']) onPaste(event) {
    // Get the clipboard data
    // window.clipboardData is for IE11 support
    // check https://developer.mozilla.org/en-US/docs/Web/Events/paste
    let paste = (event.clipboardData || window.clipboardData).getData('text');

    if(!this.validTime.test(paste))
    {
      // Prevent the default pasting event and stop bubbling
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

}

