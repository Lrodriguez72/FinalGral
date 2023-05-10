import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';
import { Usuario } from 'src/app/core/models';
import { UsuarioDetalleComponent } from './pages/usuario-detalle/usuario-detalle.component';
import { InscripcionesServiceService } from '../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  dataSource = new MatTableDataSource<Usuario>();

  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
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
    private usuariosService: UsuariosService,
    private inscripcionesService: InscripcionesServiceService
  ) {
    this.usuariosService.obtenerUsuarios().subscribe((usuarios) => {
      this.dataSource.data = usuarios;
    });
  }

  irAlDetalle(usuarioId: number): void {
    this.usuariosService
      .obtenerUsuarioPorId(usuarioId)
      .subscribe((element: Usuario | undefined) => {
        const dialog = this.matDialog.open(UsuarioDetalleComponent, {
          data: element,
        });

        //this.irAlDetalle(usuarioId);
        //   this.inscripcionesService
        //     .getInscipcionesDeAlumnos(element!.id)
        //     .subscribe((res: Inscripcion[] | undefined) => {
        //       let inscs = res;
        //       const dialog = this.matDialog.open(AlumnoDetalleComponent, {
        //         //en editar envío data
        //         //así al recibirlo, pregunto si hay data
        //         data: {
        //           element,
        //           inscs,
        //         },
        //       });
        //     });
      });
  }

  crearUsuario(): void {
    const dialog = this.matDialog.open(AbmUsuariosComponent);
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,

          {
            ...valor,
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1,
          },
        ];
      }
    });
  }

  eliminarUsuario(usuarioParaEliminar: Usuario): void {
    this.dataSource.data = this.dataSource.data.filter(
      (usuarioActual) => usuarioActual.id !== usuarioParaEliminar.id
    );
  }

  editarUsuario(usuarioParaEditar: Usuario): void {
    const dialog = this.matDialog.open(AbmUsuariosComponent, {
      data: {
        usuarioParaEditar,
      },
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.dataSource.data = this.dataSource.data.map((usuarioActual) =>
          usuarioActual.id === usuarioParaEditar.id
            ? { ...usuarioActual, ...valorDelFormulario }
            : usuarioActual
        );
      }
    });
  }
}
