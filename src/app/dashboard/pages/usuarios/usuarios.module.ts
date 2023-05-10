import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioDetalleComponent } from './pages/usuario-detalle/usuario-detalle.component';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';

import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    UsuariosComponent,
    AbmUsuariosComponent,
    UsuarioDetalleComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    PipesModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsuariosComponent,
      },
      {
        path: ':id',
        component: UsuarioDetalleComponent,
      },
    ]),
  ],
  exports: [UsuariosComponent],
})
export class UsuariosModule {}
