import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    CursosComponent,
    AbmCursosComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MatIconModule,


    MatFormFieldModule,
    MatInputModule,

    MatTableModule,
    MatButtonModule,
  ]
})
export class CursosModule { }
