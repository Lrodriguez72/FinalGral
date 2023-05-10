import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss'],
})
export class AbmUsuariosComponent {
  nombreControl = new FormControl('', [Validators.required]);
  apellidoControl = new FormControl('', [Validators.required]);

  usuariosForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.nombreControl.setValue(data.usuarioParaEditar.nombre);
      this.apellidoControl.setValue(data.usuarioParaEditar.apellido);
    }
  }

  guardar(): void {
    if (this.usuariosForm.valid) {
      this.dialogRef.close(this.usuariosForm.value);
    } else {
      this.usuariosForm.markAllAsTouched();
    }
  }
}
