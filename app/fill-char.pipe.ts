import { Pipe, PipeTransform } from '@angular/core';
/*
 * Permite completar uma string à esquerda ou à direita (por defeito)
 * com o caracter definido até um tamanho máximo de string
 * uso:
 *   value | fillchar:maxLength:fillChar:[true|false]
 * 
 * Exemplo:
 *   {{"teste" | fillchar:10:'*'}} olé!
 *   formata para : teste***** olé!
 * 
 *  {{"teste" | fillchar:10:'*':false}} olé!  
 *   formata para : *****teste olé! 
 */
@Pipe({name: 'fillchar'})
export class FillCharPipe implements PipeTransform {
  transform(value: string, maxLength: number, fillChar:string, right:boolean=true): string {
   
    let fillLength = maxLength-value.length;
    
    let retVal = "";
    if(fillLength>0)
    {
      for(let i=0; i<=fillLength-1; ++i)
      {
        retVal += fillChar; 
      }
    }

    retVal = retVal.replace(/ /g, '\u00a0');

    if(right)
      retVal =  `${value}${retVal}`;
    else
      retVal = `${retVal}${value}`;
   
    return retVal;
  }
}