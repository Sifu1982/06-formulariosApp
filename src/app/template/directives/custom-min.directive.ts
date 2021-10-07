import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  // Para que Angular pueda usar esta directiva, el elemento HTML tiene que tener un customMin y un ngModel
  selector: '[customMin][ngModel]',
  // Un provider es como un servicio
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomMinDirective,
      multi: true,
    },
  ],
})
// Validator es un objeto de Angular para realizar este tipo de validaciones, como el required, el minLength...
export class CustomMinDirective implements Validator {
  @Input() minimo!: number;

  constructor() {}

  validate(control: FormControl) {
    const inputValue = control.value;

    return inputValue < this.minimo ? { customMin: true } : null;
  }
}
