import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
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
export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource<InscripcionWithAll>();
  // inscripciones: Inscripcion[] = [];
  state$: Observable<State>;
  inscripciones: InscripcionWithAll[] = [];
  // movies$: Observable<Movie[]> = this.store.select(state => state.movies);

  displayedColumns = [
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
    // this.inscripcionesService
    //   .getAllInscripciones()
    //   .subscribe((res: Inscripcion[]) => {
    //     this.inscripciones = res;
    //   });
    this.state$ = this.store.select(selectInscripcionesState);
    this.store.dispatch(InscripcionesActions.loadInscripciones());

    this.state$.subscribe((res) => {
      if (res.inscripciones.length > 0) {
        res.inscripciones.forEach((insc) => {
          // OBTENGO EL CURSO Y LO AGREGO AL OBJETO INSCRIPCION
          this.cursosService
            .obtenerCursoPorId(insc.cursoId)
            .subscribe((response: Curso | undefined) => {
              let elementToAdd: InscripcionWithAll = {
                id: 1,
                cursoId: 1,
                alumnoId: 2,
                fechaInscripcion: new Date(),
                curso: null,
                alumno: null,
              };
              elementToAdd.curso = response!;
              // OBTENGO EL ALUMNO Y LO AGREGO AL OBJETO INSCRIPCION
              this.alumnosService
                .obtenerAlumnoPorId(insc.alumnoId)
                .subscribe((response: Alumno | undefined) => {
                  elementToAdd.alumno = response!;
                  this.inscripciones.push(elementToAdd);
                });
            });
        });
      }
    });

    setTimeout(() => {
      this.dataSource.data = this.inscripciones;
    }, 1700);
    // this.dataSource = [...this.dataSource];
  }

  ngOnInit(): void {
    // this.dataSource.data = this.inscripciones;
  }

  // ngOnInit(): void {
  //   this.inscripcionesService.getAllInscripciones().subscribe({
  //     next: (inscripciones) => {
  //       this.dataSource.data = inscripciones;
  //     },
  //   });
  // }

  crearInscripcion(): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent);

    // el afterClosed es un Observable, por lo tanto, me suscribo

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        // this.dataSource.data = [
        //   ...this.dataSource.data,
        //   {
        //     ...valor,
        //     fecha: new Date(),
        //     id: this.dataSource.data.length + 1,
        //   },
        // ];
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
}
