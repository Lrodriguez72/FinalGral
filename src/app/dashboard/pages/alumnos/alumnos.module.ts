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

import { AlumnosComponent } from './alumnos.component';
import { AlumnoDetalleComponent } from './pages/alumno-detalle/alumno-detalle.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';

import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AlumnosComponent, AbmAlumnosComponent, AlumnoDetalleComponent],
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
        component: AlumnosComponent,
      },
      {
        path: ':id',
        component: AlumnoDetalleComponent,
      },
    ]),
  ],
  exports: [AlumnosComponent],
})
export class AlumnosModule {}
