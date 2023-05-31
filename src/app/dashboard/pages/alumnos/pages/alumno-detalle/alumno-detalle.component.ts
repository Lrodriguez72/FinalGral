import { Component, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Subject, takeUntil } from 'rxjs';
import { Alumno } from '../../models';
import { Inscripcion, InscripcionWithAll } from '../../../inscripciones/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InscripcionesServiceService } from '../../../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.scss'],
})
export class AlumnoDetalleComponent implements OnDestroy {
  alumno: Alumno;
  inscripciones: InscripcionWithAll[] = [];

  private destroyed$ = new Subject();

  // (

  //   if (data) {
  //     // console.log(data);
  //     this.curso = data.element;
  //     this.inscripciones = data.inscs;
  //   }
  // }

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesServiceService,
    private dialogRef: MatDialogRef<AlumnoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    /*     // if (data) {

    //   this.alumno = data.element;
    //   this.inscripciones = data.inscs;
    // }
    this.alumnosService
      .obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((alumno) => (this.alumno = alumno)); */
    this.alumno = data;

    this.inscripcionesService
      .getAllInscripcionesByAlumnoId(this.alumno.id)
      .subscribe({
        next: (res) => {
          this.inscripciones = res;
        },
        error: (err) => console.log(err),
      });

    // this.inscripcionesService.getAllInscripciones().subscribe({
    //   next: (res) => {
    //     this.inscripciones = res.filter(
    //       (a: InscripcionWithAll) => a.alumno.id == this.alumno.id
    //     );
    //   },
    //   error: (err) => console.log(err),
    // });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
