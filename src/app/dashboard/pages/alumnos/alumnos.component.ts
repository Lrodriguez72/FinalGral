import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './services/alumnos.service';
import { Alumno } from './models';
import { AlumnoDetalleComponent } from './pages/alumno-detalle/alumno-detalle.component';
import { Inscripcion } from '../inscripciones/models';
import { InscripcionesServiceService } from '../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-tablas',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
  dataSource = new MatTableDataSource<Alumno>();

  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'fecha_registro',
    'ver_detalle',
    'eliminar',
    'editar',
  ];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesServiceService
  ) {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.dataSource.data = alumnos;
    });
  }

  // irAlDetalle(alumnoId: number): void {
  //   this.router.navigate([alumnoId], {
  //     relativeTo: this.activatedRoute,
  //   });
  // }

  // irAlDetalle(alumnoId: number): void {
  //   this.alumnosService
  //     .obtenerAlumnoPorId(alumnoId)
  //     .subscribe((element: Alumno | undefined) => {
  //       this.inscripcionesService
  //         .getInscipcionesDeAlumnos(element!.id)
  //         .subscribe((res: Inscripcion[] | undefined) => {
  //           let inscs = res;
  //           const dialog = this.matDialog.open(AlumnoDetalleComponent, {
  //             //en editar envío data
  //             //así al recibirlo, pregunto si hay data
  //             data: {
  //               element,
  //               inscs,
  //             },
  //           });
  //         });
  //     });
  //}

  irAlDetalle(alumnoId: number): void {
    /* this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute,
    }); */

    let alumnoData;
    this.alumnosService.obtenerAlumnoPorId(alumnoId).subscribe({
      next: (res) => (alumnoData = res),
      error: (err) => console.log(err),
    });
    const dialog = this.matDialog.open(AlumnoDetalleComponent, {
      data: alumnoData,
    });
  }

  crearAlumno(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent);
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          // AGREGANDO NUEVO ELEMENTO:
          {
            ...valor, // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1,
          },
        ];
      }
    });
  }

  eliminarAlumno(alumnoParaEliminar: Alumno): void {
    this.dataSource.data = this.dataSource.data.filter(
      (alumnoActual) => alumnoActual.id !== alumnoParaEliminar.id
    );
  }

  editarAlumno(alumnoParaEditar: Alumno): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar,
      },
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.dataSource.data = this.dataSource.data.map((alumnoActual) =>
          alumnoActual.id === alumnoParaEditar.id
            ? { ...alumnoActual, ...valorDelFormulario } // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            : alumnoActual
        );
      }
    });
  }
}
