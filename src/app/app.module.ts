import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { BairroComponent } from './bairro/bairro.component';
import { CidadeComponent } from './cidades/cidades.component';
import { HeaderComponent } from './header/header.component';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BairroComponent,
    CidadeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    AuthRoutingModule,
    MatFileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
