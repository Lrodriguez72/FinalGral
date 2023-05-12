import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/core/models';

export const EstablecerUsuarioAtenticado = createAction(
  '[auth] Establecer Usuario Atenticado',
  //props: permite recibir argumentos o data
  //props debe importarse
  // en este caso el usuario que se quiere establecer
  props<{ payload: Usuario & { token: string } }>()
);

export const QuitarUsuarioAtenticado = createAction(
  '[auth] Quitar Usuario Atenticado'
);
