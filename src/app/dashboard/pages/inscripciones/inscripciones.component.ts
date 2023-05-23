import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';
import { InscripcionesServiceService } from './services/inscripciones.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { State } from './store/inscripciones.reducer';
import { Store } from '@ngrx/store';
import { selectInscripcionesState } from './store/inscripciones.selectors';
import { InscripcionesActions } from './store/inscripciones.actions';
import { InscripcionDialogComponent } from './components/inscripcion-dialog/inscripcion-dialog.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource<Inscripcion>();
  inscripciones: Inscripcion[] = [];
  state$: Observable<State>;

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
    private store: Store
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
    // this.inscripcionesService
    //   .getAllInscripciones()
    //   .subscribe((res: Inscripcion[]) => {
    //     this.inscripciones = res;
    //   });
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
    // this.inscripcionesService.getAllInscripciones().subscribe({
    //   next: (inscripciones) => {
    //     this.dataSource.data = inscripciones;
    //   },
    // });
  }

  crearInscripcion(): void {
    this.matDialog.open(InscripcionDialogComponent);

    // const dialog = this.matDialog.open(AbmInscripcionesComponent);

    // // el afterClosed es un Observable, por lo tanto, me suscribo

    // dialog.afterClosed().subscribe((valor) => {
    //   if (valor) {
    //     this.dataSource.data = [
    //       ...this.dataSource.data,

    //       {
    //         ...valor,
    //         fecha: new Date(),

    //         id: this.dataSource.data.length + 1,
    //       },
    //     ];
    //   }
    // });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
  }

  // eliminarInscripcion(insc: Inscripcion): void {
  //   this.inscripcionesService.deleteInscripcionById(insc.id);
  // }

  // editarInscripcion(inscripcionParaEditar: Inscripcion): void {
  //   {
  //     const dialog = this.matDialog.open(AbmInscripcionesComponent, {
  //       data: {
  //         inscripcionParaEditar,
  //       },
  //     });

  //     dialog.afterClosed().subscribe((valorDelFormulario) => {
  //       if (valorDelFormulario) {
  //         this.inscripcionesService.editarInscripcion(
  //           inscripcionParaEditar.id,
  //           valorDelFormulario
  //         );
  //       }
  //     });
  //   }
}
