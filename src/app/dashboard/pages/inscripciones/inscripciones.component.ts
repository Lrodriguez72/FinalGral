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
      .getInscripciones()
      .subscribe((res: Inscripcion[]) => {
        this.inscripciones = res;
      });
  }

  ngOnInit(): void {
    this.inscripcionesService.getInscripciones().subscribe({
      next: (inscripciones) => {
        this.dataSource.data = inscripciones;
      },
    });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  eliminarInscripcion(insc: Inscripcion): void {
    this.inscripcionesService.eliminarInscripcion(insc.id);
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
