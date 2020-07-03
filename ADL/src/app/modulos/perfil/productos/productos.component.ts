import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JsonService } from '../../../servicios/Json/json.service';
import { ConsolidadoService } from '../../../servicios/perfil/consolidado.service';
import { Enmascara } from '../../../servicios/enmascarar/Enmascarar.service';
import {TranslateService} from '@ngx-translate/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any;
  detalle: any;
  modaResulDetalle: any;
  fechaActual: number = Date.now();

  constructor(public json: JsonService,
              private consolidadoService: ConsolidadoService,
              public translate: TranslateService,
              public enmascara: Enmascara) {
                translate.setDefaultLang('en');
                this.consolidadoService.activarBancos(false);
              }

  ngOnInit(){
    this.json.obternerProductos().subscribe( data => {
      this.consolidadoService.cargarContenido(data);
    });
  }

  activarOtrosBancos = (e) => {
    this.consolidadoService.activarBancos(e.target.checked);
  }
}
