import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginFormValue } from '../services/auth.service';
import { Usuario } from 'src/app/core/models';

export const USUARIO_ADMIN_MOCK: Usuario = {
  id: 1,
  apellido: 'testapellido',
  email: 'test@mail.com',
  nombre: 'testnombre',
  role: 'admin',
  password: '123456',
  token: 'asdkjsanfkdams3u2hjdasfadsuh',
};

export class AuthServiceMock {
  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  login(formValue: LoginFormValue): void {
    this.authUser$.next(USUARIO_ADMIN_MOCK);
  }

  verificarToken(): Observable<boolean> {
    return of(true);
  }
}
