import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss'],
})
export class AbmCursosComponent {
  nombreControl = new FormControl('', [Validators.required]);
  fechaInicioControl = new FormControl('', [Validators.required]);
  fechaFinControl = new FormControl('', [Validators.required]);

  cursosForm = new FormGroup({
    nombre: this.nombreControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaInicioControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      const cursoParaEditar = data.curso;

      this.nombreControl.setValue(data.cursoParaEditar.nombre);
      this.fechaInicioControl.setValue(data.alumnoParaEditar.fecha_inicio);
      this.fechaFinControl.setValue(data.cursoParaEditar.fecha_fin);
    }
  }

  guardar(): void {
    if (this.cursosForm.valid) {
      //al cerrar el diálogo emito el valor del formulario que será observado en el curso.component.ts
      this.dialogRef.close(this.cursosForm.value);
    } else {
      this.cursosForm.markAllAsTouched();
    }
  }
}
