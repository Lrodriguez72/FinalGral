import { Component, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Subject, takeUntil } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.scss'],
})
export class UsuarioDetalleComponent implements OnDestroy {
  usuario: Usuario | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private dialogRef: MatDialogRef<UsuarioDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      console.log(data);
      this.usuario = data;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
