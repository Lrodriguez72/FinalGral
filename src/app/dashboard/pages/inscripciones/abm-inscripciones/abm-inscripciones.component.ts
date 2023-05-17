import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Curso } from '../../cursos/models';
import { Alumno } from '../../alumnos/models';
import { CursosService } from '../../cursos/services/cursos.service';
import { AlumnosService } from '../../alumnos/services/alumnos.service';
import { Inscripcion } from '../models';
import { InscripcionesServiceService } from '../services/inscripciones.service';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent {
  cursos: Curso[] = [];
  alumnos: Alumno[] = [];
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
    @Inject(MAT_DIALOG_DATA) private data: any,

    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesServiceService
  ) {
    this.cursosService.obtenerCursos().subscribe((success: Curso[]) => {
      this.cursos = success;
    });

    this.alumnosService.obtenerAlumnos().subscribe((success: Alumno[]) => {
      this.alumnos = success;
    });
    if (data) {
      this.cursoControl.setValue(data.inscripcionParaEditar.curso.nombre);
      this.alumnoControl.setValue(data.inscripcionParaEditar.alumno.nombre);
      this.fechaControl.setValue(data.inscripcionParaEditar.curso.fecha_inicio);
    }
  }

  guardar(): void {
    this.inscripcionesService
      .PostInscripciones(
        parseInt(this.cursoControl.value!),
        parseInt(this.alumnoControl.value!)
      )
      .subscribe((response) => {
        console.log(response);
      });

    if (this.inscripcionesForm.valid) {
      //al cerrar el diálogo emito el valor del formulario que será observado en el curso.component.ts
      this.inscripcionesService.PostInscripciones(
        parseInt(this.cursoControl.value!),
        parseInt(this.alumnoControl.value!)
      );
      // .subscribe((response) => {
      //   console.log(response);
      // });

      // this.inscripcionesService.PostInscripciones(this.cursoControl.get('cursoControl'))
      this.dialogRef.close(this.inscripcionesForm.value);
    } else {
      this.inscripcionesForm.markAllAsTouched();
    }
  }
}
