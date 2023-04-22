import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/dashboard/pages/cursos/services/cursos.service';

import { Curso } from 'src/app/dashboard/pages/cursos/cursos.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
})
export class CursoDetalleComponent implements OnDestroy {
  curso: Curso | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService
  ) {
    this.cursosService
      .obtenerCursoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((curso) => (this.curso = curso));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
