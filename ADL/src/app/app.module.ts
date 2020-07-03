import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './modulos/menu/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Enmascara } from './servicios/enmascarar/Enmascarar.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Globales } from './modulos/globales';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    Enmascara, Globales],
  bootstrap: [AppComponent]
})
export class AppModule { }


