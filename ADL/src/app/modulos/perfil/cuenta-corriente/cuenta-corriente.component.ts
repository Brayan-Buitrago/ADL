import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/perfil/consolidado.service';
import {TranslateService} from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Globales } from '../../globales';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.css']
})
export class CuentaCorrienteComponent implements OnInit {
  @ViewChild('modalDetalle') modal: ElementRef;
  productos: any;
  cuentasCorrientes = [];
  activarCuentaCorriente = false;
  detalleCCorrienteModal: any;
  modaResulDetalle: any;
  globales: any;

  constructor(private consolidadoService: ConsolidadoService,
              public translate: TranslateService,
              private modalService: NgbModal,
              global: Globales) {
                this.globales = global;
                translate.setDefaultLang('en');
                this.cargarJson();
  }

  ngOnInit(): void {
  }

  cargarJson = () => {

    this.consolidadoService.obtenerBancos().subscribe(data => {
      this.cargarProductos(data);
    });

    this.consolidadoService.obtenerJson().subscribe(data => {
      this.productos = data.product;
    });
  }


  cargarProductos = (activarBancos) => {
    let activarCuentaCorriente = false;
    const cuentasCorrientes = [];
    const banco = this.globales.banco;
    const productoCC = this.globales.tipoCuentas.cuentaCorriente;

    if (this.productos) {
    this.productos.map( (obj) => {
      if (obj.accountInformation.bank === banco && !activarBancos) {
        if (obj.typeAccount === productoCC) {
          activarCuentaCorriente = true;
          cuentasCorrientes.push(obj);
        }
      }else{
        if (obj.typeAccount === productoCC && activarBancos) {
          activarCuentaCorriente = true;
          cuentasCorrientes.push(obj);
        }
      }
    });
  }
    this.activarCuentaCorriente = activarCuentaCorriente;
    this.cuentasCorrientes = cuentasCorrientes;
  }


  verDetalle = (cuentasCorriente) => {
    this.detalleCCorrienteModal = cuentasCorriente;
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
