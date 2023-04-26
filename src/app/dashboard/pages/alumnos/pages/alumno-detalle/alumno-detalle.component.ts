import { Component, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Subject, takeUntil } from 'rxjs';
import { Alumno } from '../../models';
import { Inscripcion } from '../../../inscripciones/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.scss'],
})
export class AlumnoDetalleComponent implements OnDestroy {
  alumno: Alumno | undefined;
  inscripciones: Inscripcion[] | undefined = undefined;

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
    private dialogRef: MatDialogRef<AlumnoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      console.log(data);
      this.alumno = data.element;
      this.inscripciones = data.inscs;
    }
    // this.alumnosService
    //   .obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((alumno) => (this.alumno = alumno));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
