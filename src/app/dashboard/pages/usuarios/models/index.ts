export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  role: string;
  email: string;
  password: string;
  token: string;
}

export interface CrearUsuario {
  nombre: string;
  apellido: string;
  role: string;
  email: string;
  password: string;
  token: string;
}
