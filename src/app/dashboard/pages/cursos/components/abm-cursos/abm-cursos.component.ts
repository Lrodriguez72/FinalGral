import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss']
})
export class AbmCursosComponent {

  nombreControl = new FormControl('', [Validators.required]);
  fechaInicioControl = new FormControl('', [Validators.required]);
  fechaFinControl = new FormControl('', [Validators.required]);

  alumnosForm = new FormGroup({
    nombre: this.nombreControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaInicioControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    if (data) {
      this.nombreControl.setValue(data.alumnoParaEditar.nombre);
      this.fechaInicioControl.setValue(data.alumnoParaEditar.apellido);
    }
  }


  guardar(): void {
    if (this.alumnosForm.valid) {
      this.dialogRef.close(this.alumnosForm.value)
    } else {
      this.alumnosForm.markAllAsTouched();
    }
  }
}
