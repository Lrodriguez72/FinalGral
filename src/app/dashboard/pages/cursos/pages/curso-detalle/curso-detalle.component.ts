import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/dashboard/pages/cursos/services/cursos.service';
import { Curso } from 'src/app/dashboard/pages/cursos/cursos.component';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';
import { InscripcionesServiceService } from '../../../inscripciones/services/inscripciones.service';
import { InscripcionWithAll } from '../../../inscripciones/models';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
})
export class CursoDetalleComponent implements OnDestroy {
  curso: Curso;
  inscripciones: InscripcionWithAll[] = [];

  private destroyed$ = new Subject();

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private cursosService: CursosService
  // ) {
  //   this.cursosService
  //     .obtenerCursoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((curso) => (this.curso = curso));
  // }

  constructor(
    private dialogRef: MatDialogRef<CursoDetalleComponent>,
    private inscripcionesService: InscripcionesServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.curso = data;

    this.inscripcionesService.getAllInscripciones().subscribe({
      next: (res) => {
        this.inscripciones = res.filter(
          (a: InscripcionWithAll) => a.curso.id == this.curso?.id
        );
      },
      error: (err) => console.log(err),
    });

    // if (data) {
    //   // console.log(data);
    //   this.curso = data.element;
    //   this.inscripciones = data.inscs;
    // }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
