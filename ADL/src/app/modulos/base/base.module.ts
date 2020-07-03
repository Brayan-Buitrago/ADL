import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { PerfilRoutingModule } from '../perfil/perfil-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseRoutingModule,
    PerfilRoutingModule
  ]
})
export class BaseModule { }
