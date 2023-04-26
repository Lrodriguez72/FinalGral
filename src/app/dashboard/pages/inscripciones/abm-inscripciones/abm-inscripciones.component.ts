import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent {
  cursoControl = new FormControl('', [Validators.required]);
  alumnoControl = new FormControl('', [Validators.required]);
  fechaControl = new FormControl('', [Validators.required]);

  inscripcionesForm = new FormGroup({
    curso: this.cursoControl,
    alumno: this.alumnoControl,
    fecha: this.fechaControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.cursoControl.setValue(data.inscripcionParaEditar.curso);
      this.alumnoControl.setValue(data.inscripcionParaEditar.alumno);
      this.fechaControl.setValue(data.inscripcionParaEditar.fecha);
    }
  }

  guardar(): void {
    if (this.inscripcionesForm.valid) {
      //al cerrar el diálogo emito el valor del formulario que será observado en el inscripcion.component.ts
      this.dialogRef.close(this.inscripcionesForm.value);
    } else {
      this.inscripcionesForm.markAllAsTouched();
    }
  }
}
