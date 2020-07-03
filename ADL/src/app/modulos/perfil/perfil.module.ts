import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { CdtComponent } from './cdt/cdt.component';
import { CreditoComponent } from './credito/credito.component';
import { TarjetaCreditoComponent } from './tarjeta-credito/tarjeta-credito.component';
import { CuentaCorrienteComponent } from './cuenta-corriente/cuenta-corriente.component';
import { CuentaAhorroComponent } from './cuenta-ahorro/cuenta-ahorro.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    ProductosComponent,
    CdtComponent,
    CreditoComponent,
    TarjetaCreditoComponent,
    CuentaCorrienteComponent,
    CuentaAhorroComponent,
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ]
})
export class PerfilModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
