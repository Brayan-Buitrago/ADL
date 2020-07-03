import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/perfil/consolidado.service';
import {TranslateService} from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Globales } from '../../globales';

@Component({
  selector: 'app-cuenta-ahorro',
  templateUrl: './cuenta-ahorro.component.html',
  styleUrls: ['./cuenta-ahorro.component.css']
})
export class CuentaAhorroComponent implements OnInit {
  @ViewChild('modalDetalle') modal: ElementRef;
  productos: any;
  cuentasAhorros = [];
  activarCuentaAhorro = false;
  detalleCAhorrosModal: any;
  modaResulDetalle: any;
  globales: any;

  constructor(private consolidadoService: ConsolidadoService,
              public translate: TranslateService,
              public modalService: NgbModal,
              global: Globales) {
                this.globales = global;
                translate.setDefaultLang('en');
                this.cargarJson();
}

  ngOnInit(): void {
  }

  cargarJson = () => {
    let activarCuentaAhorro = false;
    const cuentasAhorros = [];
    const banco = this.globales.banco;
    const productoCA = this.globales.tipoCuentas.cuentaAhorros;

    this.consolidadoService.obtenerJson().subscribe(data => {
      this.productos = data.product;
      this.productos.map( (obj) => {
        if (obj.accountInformation.bank === banco) {
          if (obj.typeAccount === productoCA) {
            activarCuentaAhorro = true;
            cuentasAhorros.push(obj);
          }
        }
      });

      this.activarCuentaAhorro = activarCuentaAhorro;
      this.cuentasAhorros = cuentasAhorros;
    });
  }

  verDetalle = (credito) => {
    this.detalleCAhorrosModal = credito;
    this.modaResulDetalle = this.modalService.open(this.modal);
    this.modaResulDetalle.result.then((result) => {
      if (result === 'Cerrar') {
        this.modaResulDetalle.close();
      }
    }, (reason) => {
      this.modaResulDetalle.close();
    });
  }

}
