import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { CoreModule } from './core/core.module';
import { CursosModule } from './dashboard/pages/cursos/cursos.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    DashboardModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
