import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import {
  CreateInscripcionData,
  Inscripcion,
  InscripcionWithAll,
} from '../models';
import { InscripcionesServiceService } from '../services/inscripciones.service';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent implements OnInit, OnDestroy {
  cursos: Curso[] = [];
  alumnos: Alumno[] = [];
  cursoControl = new FormControl('', [Validators.required]);
  alumnoControl = new FormControl('', [Validators.required]);
  fechaControl = new FormControl('');

  inscripcionesForm = new FormGroup({
    cursoId: this.cursoControl,
    alumnoId: this.alumnoControl,
    fecha: this.fechaControl,
  });

  selectedCursoControl = new FormControl<Curso | null>(null);

  AlumnoIdControl = new FormControl<number | null>(null, [Validators.required]);

  courseIdControl = new FormControl<number | null>(null, [Validators.required]);

  destroyed$: any;

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

  ngOnDestroy(): void {
    // this.destroyed$.next();
    // this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (res) => {
        this.cursos = res;
      },
    });
    this.alumnosService.obtenerAlumnos().subscribe({
      next: (res) => {
        this.alumnos = res;
      },
    });
  }

  // onSave(): void {
  //   this.store.dispatch(
  //     InscripcionesActions.createInscripcion({
  //       data: this.incripcionesForm.value as CreateInscripcionData,
  //     })
  //   );

  //   this.dialogRef.close();
  // }

  guardar(): void {
    if (this.inscripcionesForm.valid) {
      const data: CreateInscripcionData = {
        alumnoId: parseInt(this.alumnoControl.value!),
        cursoId: parseInt(this.cursoControl.value!),
      };
      //al cerrar el diálogo emito el valor del formulario que será observado en el curso.component.ts
      this.inscripcionesService.createInscripcion(data).subscribe((data) => {
        this.dialogRef.close(data);
      });

      // this.inscripcionesService.PostInscripciones(this.cursoControl.get('cursoControl'))
      //this.dialogRef.close(this.inscripcionesForm.value);
      //this.dialogRef.close(valor);
    } else {
      this.inscripcionesForm.markAllAsTouched();
    }
  }
}
