import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';
import { InscripcionesServiceService } from './services/inscripciones.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { State } from './store/inscripciones.reducer';
import { InscripcionesActions } from './store/inscripciones.actions';
import { selectInscripcionesState } from './store/inscripciones.selectors';
import { async, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { InscripcionWithAll } from './models';
import { CursosService } from '../cursos/services/cursos.service';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { Curso } from '../cursos/models';
import { Alumno } from '../alumnos/models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<InscripcionWithAll>();
  // inscripciones: Inscripcion[] = [];
  state$: Observable<State>;
  inscripciones: InscripcionWithAll[] = [];

  private destroyed$ = new Subject();

  displayedColumns: string[] = [
    'id',
    'curso',
    'nombreCompleto',
    'fechaInscripcion',
    'detalle',
    'editar',
    'eliminar',
  ];
  constructor(
    private inscripcionesService: InscripcionesServiceService,
    private matDialog: MatDialog,
    private store: Store,
    private cursosService: CursosService,
    private alumnosService: AlumnosService
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
  }

  ngOnInit(): void {
    // await this.state$.forEach( (v) => {  })

    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.state$.subscribe((res) => {
      console.log('aca');
      this.dataSource.data = res.inscripciones;
    });

    // this.dataSource.data
  }

  crearInscripcion(): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent);

    // el afterClosed es un Observable, por lo tanto, me suscribo

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.store.dispatch(InscripcionesActions.loadInscripciones());
      }
    });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  eliminarInscripcion(insc: Inscripcion): void {
    this.inscripcionesService.deleteInscripcionById(insc.id);
  }

  editarInscripcion(inscripcionParaEditar: Inscripcion): void {
    {
      const dialog = this.matDialog.open(AbmInscripcionesComponent, {
        data: {
          inscripcionParaEditar,
        },
      });

      dialog.afterClosed().subscribe((valorDelFormulario) => {
        if (valorDelFormulario) {
          this.inscripcionesService.editarInscripcion(
            inscripcionParaEditar.id,
            valorDelFormulario
          );
        }
      });
    }
  }

  irAlDetalle(id: number) {}

  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
