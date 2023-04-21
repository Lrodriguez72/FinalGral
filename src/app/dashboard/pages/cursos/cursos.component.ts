import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  dataSource = new MatTableDataSource<Curso>();

  displayedColumns = [
    'id',
    'nombre',
    'fecha_inicio',
    'fecha_fin',
    'detalle',
    'editar',
    'eliminar',
  ];

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alumnosService: CursosService
  ) {}

  ngOnInit(): void {
    //lo primero es suscribirse a los cambios que ocurran con el Observable
    //así, al mantenerse activa la suscripción, cada vez que ocurra un cambio, como ABM, del lado del servicio
    //voy a recibir la emisión del nuevo valor
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  crearCurso(): void {
    //en el crear no envío data

    //abre el diálogo
    const dialog = this.matDialog.open(AbmCursosComponent);

    //el afterClosed es un Observable, por lo tanto, me suscribo

    dialog.afterClosed().subscribe((valor) => {
      //el valor permite agregar el curso en el Servicio
      //verifico que el form contenga un valor, que no haya sido cancelado
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          // AGREGANDO NUEVO ELEMENTO:
          {
            ...valor, // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            id: this.dataSource.data.length + 1,
          },
        ];
      }
    });
  }

  aplicarFiltros(ev: Event): void {}

  irAlDetalle(cursoId: number): void {}

  eliminarCurso(curso: Curso): void {}

  editarCurso(curso: Curso): void {
    {
      const dialog = this.dialog.open(AbmCursosComponent, {
        //en editar envío data
        //así al recibirlo, pregunto si hay data
        data: {
          curso,
        },
      });
      //me suscribo y si hay valor, llamo al editar del servicio
      dialog.afterClosed().subscribe((formValue) => {
        if (formValue) {
          this.cursosService.editarCurso(curso.id, formValue);
        }
      });
    }
  }
}
