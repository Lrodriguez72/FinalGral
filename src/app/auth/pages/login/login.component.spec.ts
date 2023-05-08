import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { AuthServiceMock } from '../../mocks/auth-service.mock';

//Test sobre el Componente
describe('Pruebas sobre el LoginComponent', () => {
  let component: LoginComponent;

  //lógica antes de cada prueba, para configuración previa
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //TestBed llama al método para configurar un módulo de prueba
      //es similar a declarar el módulo: declarations, imports, providers, etc
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        PipesModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],

      //mediante los providers reemplazo el servicio real por el mocks para pruebas AuthServiceMock
      // así evito la peticiòn al servicio normal
      //ya que NO  debo permitir que las pruebas automáticas se comunique realmente con la API.

      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents();

    //antes de cada prueba vuelvo a instanciar el componente:
    const fixture = TestBed.createComponent(LoginComponent);

    //inicializo la instancia
    component = fixture.componentInstance;
    //ahora ya puedo acceder a los métodos de la clase

    //en los testing, en cada beforeEach, antes de las pruebas, deben detectarse los cambios:
    fixture.detectChanges();
  });

  //hago una prueba sobre el Form:
  it('Si el campo email esta vacio el FormControl del email debe ser invalido', () => {
    //fuerzo el valor del formulario que necesito para la prueba:
    component.loginForm.setValue({ email: null, password: null });
    //defino en expect
    expect(component.emailControl.invalid).toBeTrue();
  });
  it('Si el loginForm es invalido, debe marcar todos los controles como touched', () => {
    component.loginForm.setValue({ email: null, password: null });
    const spyOnMarkAllAsTouched = spyOn(
      component.loginForm,
      'markAllAsTouched'
    );

    component.onSubmit();

    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });

  it('Si el loginForm es valido, debe llamar al metodo login del AuthService', () => {
    component.loginForm.setValue({
      email: 'test@mail.com',
      password: '123456',
    });
    const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'login');

    component.onSubmit();
    //espero que el formulario sea válido
    expect(component.loginForm.valid).toBeTrue();
    //y además que se haya llamado el Login de authService
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });
});
