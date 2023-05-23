export interface NavItem {
  path: string;
  title: string;
  icon?: string;
  //allowedRoles: string[];
}

const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
    //allowedRoles: ['admin', 'user'],
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'school',
    //allowedRoles: ['admin', 'user'],
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'book',
    //allowedRoles: [],
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'face',
    //allowedRoles: ['admin'],
  },
];

export default links;
