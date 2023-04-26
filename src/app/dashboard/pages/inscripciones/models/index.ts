import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export interface Inscripcion {
  id: number;
  curso: Curso;
  alumno: Alumno;
  fechaInscripcion: Date;
}
