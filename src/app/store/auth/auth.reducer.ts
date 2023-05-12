import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/core/models';
import {
  EstablecerUsuarioAtenticado,
  QuitarUsuarioAtenticado,
} from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: Usuario | null;
  token: string | null;
}

const inicialState: AuthState = {
  authUser: null,
  token: localStorage.getItem('token') || null,
};

export const authReducer = createReducer(
  inicialState,
  //ante la acción, se retorna un nuevo estado:
  on(EstablecerUsuarioAtenticado, (currentState, { payload }) => {
    //el usuario autenticado se recibe de la acción:
    return {
      //se reemplaza el estado anterior por uno nuevo con otro valor de authUser
      authUser: payload,
      token: payload.token,
    };
  }),

  on(QuitarUsuarioAtenticado, (currentState) => {
    return {
      authUser: null,
      token: null,
    };
  })
);
