import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  nombreApellidoPattern,
  emailPattern,
  noPuedeSerStrider,
} from '../../../shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
      ],
      // Cuando se use una validación personalizada, al llamar al método, recordar no usar ()
      userName: [
        '',
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'David Martinez',
      email: 'test1@test.com',
      userName: 'Sifu1982',
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    // Esto dispara las validaciones en cada uno de los campos
    this.miFormulario.markAllAsTouched();
  }
}
