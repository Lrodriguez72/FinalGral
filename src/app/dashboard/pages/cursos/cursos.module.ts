import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
//import { BrowserModule } from '@angular/platform-browser';
import { CursoDetalleComponent } from './pages/curso-detalle/curso-detalle.component';

@NgModule({
  declarations: [CursosComponent, AbmCursosComponent, CursoDetalleComponent],
  imports: [
    //BrowserModule,
    DirectivesModule,
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  // exports: [CursosComponent],
})
export class CursosModule {}
