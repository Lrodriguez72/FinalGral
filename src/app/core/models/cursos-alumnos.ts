import { Alumno } from 'src/app/dashboard/pages/alumnos/models';
import { Curso } from 'src/app/dashboard/pages/cursos/models';

/*export interface Inscripcion {
  id: number;
  idCurso: number;
  idAlumno: number;
  fechaInscripcion: Date;
}
*/

export interface Inscripcion {
  id: number;
  curso: Curso;
  alumno: Alumno;
  fechaInscripcion: Date;
}
