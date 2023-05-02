import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AlumnoDetalleComponent } from './pages/alumnos/pages/alumno-detalle/alumno-detalle.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { AbmInscripcionesComponent } from './pages/inscripciones/abm-inscripciones/abm-inscripciones.component';

import { AdminGuard } from '../auth/guards/admin.guard';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,

    //.forChild define las ramas, recibe un array de rutas hijas
    RouterModule.forChild([
      {
        // http://localhost:XXXX/dashboard/estudiantes
        path: 'alumnos',
        loadChildren: () =>
          import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
