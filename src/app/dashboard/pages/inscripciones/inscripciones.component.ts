import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from 'src/app/core/models/cursos-alumnos';
import { InscripcionesServiceService } from './services/inscripciones.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource<Inscripcion>();
  inscripciones: Inscripcion[] = [];

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
    private matDialog: MatDialog
  ) {
    this.inscripcionesService
      .getAllInscripciones()
      .subscribe((res: Inscripcion[]) => {
        this.inscripciones = res;
      });
  }

  ngOnInit(): void {
    this.inscripcionesService.getAllInscripciones().subscribe({
      next: (inscripciones) => {
        this.dataSource.data = inscripciones;
      },
    });
  }

  crearInscripcion(): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent);

    // el afterClosed es un Observable, por lo tanto, me suscribo

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,

          {
            ...valor,
            fecha: new Date(),

            id: this.dataSource.data.length + 1,
          },
        ];
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
}
