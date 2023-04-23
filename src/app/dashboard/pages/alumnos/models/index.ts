export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fecha_registro: Date;
}

export interface CrearAlumno {
  nombre: string;
  apellido: string;
  fecha_registro: Date;
}
