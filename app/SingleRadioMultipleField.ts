/**
 * @author PMATOS
 * @description Permite utilizar radio's com multiplos campos de um modelo
 *
 * Um grupo de radio's em HTML deve ter o mesmo nome, o que numa situação de varios campos
 * num modelo não funciona.
 *
 * Assim, no html podemos criar o formulário com o mesmo nome de campo e no código atribuir
 * campos do modelo diferentes ao grupo.
 *
 * Exemplo de HTML:

    <div class="form-group">
      <label>Tipos de Pagamentos: </label>
      <div class="radio-inline">
        <input id="paysess" type="radio" formControlName="PayWhat" value="1">
        <label for="paysess">Pagar por Sessão</label>
      </div>
      <div class="radio-inline">
        <input id="paypax" type="radio" formControlName="PayWhat" value="2">
        <label for="paypax">Pago por Participante</label>
      </div>
      <div class="radio-inline">
        <input id="payhour" type="radio" formControlName="PayWhat" value="3">
        <label for="payhour">Pago por Hora</label>
      </div>
    </div>

 * Exemplo da definição do FormControl

    this.Form = new FormGroup({
      Acronimo: new FormControl('', Validators.required),
      Descricao: new FormControl('', Validators.required),
      Room: new FormControl(''),
      PayBaseValue: new FormControl(''),
      PayWhat: new FormControl('1'),
      Active: new FormControl(true)
    });

 *
 * Exemplo de inicialização da classe
 *

     this.SelectOnePaymentType = new SingleRadioMultipleField(this.Form.get('PayWhat'),
                                                      this.Model,
                                                      [new RadioOptionItem('1', 'PayBySessionYN'),
                                                       new RadioOptionItem('2', 'PayByPaxYN'),
                                                       new RadioOptionItem('3', 'PayByHourYN')]);

 *
 * Quando os dados são carregados depois da inicialização ou a pedido, devemos fazer o refresh da classe
 *
    this.SelectOnePaymentType.refesh(this.Model);
 *
 */
import { AbstractControl } from '@angular/forms';

export class RadioOptionItem {
  public ModelFieldName: any;
  public ControlValue: any;

  constructor(value: any, fieldname: any) {
    this.ControlValue = value;
    this.ModelFieldName = fieldname;
  }
}

export class SingleRadioMultipleField {
  ModelVar: any;
  Control: AbstractControl;
  Keys: Array<RadioOptionItem>  = [];

  constructor (ctl: AbstractControl, mvar: any, list: Array<RadioOptionItem>) {
    this.Control = ctl;
    this.Keys = list;
    this.ModelVar = mvar;

    // subscreve o evento de alteração de valor do controlo para garantir que só um dos campos
    // é preenchido a true.
    this.Control.valueChanges.subscribe(
      (value) => {
       for (let item of this.Keys) {
          if (item.ControlValue === value) {
            this.ModelVar[item.ModelFieldName] = true;
          } else {
            this.ModelVar[item.ModelFieldName] = false;
          }
        }
      }
    );
  }

  refesh(mvar: any) {
    this.ModelVar = mvar;
    for (const item of this.Keys) {
      if (this.ModelVar[item.ModelFieldName] === true) {
        this.Control.setValue(item.ControlValue);
      }
    }
  }
}
