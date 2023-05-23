import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Alumno } from '../../../alumnos/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../../cursos/services/cursos.service';
import { Curso } from '../../../cursos/models';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { CreateInscripcionData } from '../../models';
import { DialogRef } from '@angular/cdk/dialog';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-inscripcion-dialog',
  templateUrl: './inscripcion-dialog.component.html',
  styleUrls: ['./inscripcion-dialog.component.scss'],
})
export class InscripcionDialogComponent implements OnInit, OnDestroy {
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  selectedCourseControl = new FormControl<Curso | null>(null);

  studentIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);

  courseIdControl = new FormControl<number | null>(null, [Validators.required]);

  incripcionForm = new FormGroup({
    studentId: this.studentIdControl,
    courseId: this.courseIdControl,
  });

  destroyed$ = new Subject<void>();

  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private dialogRef: DialogRef<InscripcionDialogComponent>,
    private store: Store
  ) {
    this.selectedCourseControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (curso) => {
          if (curso) {
            this.courseIdControl.setValue(curso.id);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
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

  onSave(): void {
    this.store.dispatch(
      InscripcionesActions.createInscripcion({
        data: this.incripcionForm.value as CreateInscripcionData,
      })
    );

    this.dialogRef.close();
  }
}
