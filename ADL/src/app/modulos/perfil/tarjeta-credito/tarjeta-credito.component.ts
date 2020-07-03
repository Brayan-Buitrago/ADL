import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/perfil/consolidado.service';
import {TranslateService} from '@ngx-translate/core';
import { Enmascara } from '../../../servicios/enmascarar/Enmascarar.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from '../../../servicios/Json/json.service';
import { Globales } from '../../globales';


@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  @ViewChild('modalDetalle') modal: ElementRef;
  productos: any;
  tarjetasCreditos = [];
  activarTarjeta = false;
  detalleTCModal: any;
  modaResulDetalle: any;
  productoEnviar: any;
  globales: any;

  constructor(private consolidadoService: ConsolidadoService,
              public translate: TranslateService,
              public enmascara: Enmascara,
              private modalService: NgbModal,
              public json: JsonService,
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
    let activarTarjeta = false;
    const tarjetasCreditos = [];
    const banco = this.globales.banco;
    const productoTC = this.globales.tipoCuentas.tc;
    if (this.productos) {
    this.productos.map((obj) => {
      if (obj.accountInformation.bank === banco && !activarBancos) {
        if (obj.typeAccount === productoTC) {
          activarTarjeta = true;
          tarjetasCreditos.push(obj);
        }
      }else{
        if (obj.typeAccount === productoTC && activarBancos) {
          activarTarjeta = true;
          tarjetasCreditos.push(obj);
        }
      }
    });
  }
    this.activarTarjeta = activarTarjeta;
    this.tarjetasCreditos = tarjetasCreditos;
  }


  verDetalle = (cuentasCorriente) => {
    this.detalleTCModal = cuentasCorriente;
    this.modaResulDetalle = this.modalService.open(this.modal);
    this.modaResulDetalle.result.then((result) => {
      if (result === 'Cerrar') {
        this.modaResulDetalle.close();
      }
    }, (reason) => {
      this.modaResulDetalle.close();
    });
  }


  pagarTargeta = (tarjetasCredito) => {
     this.productoEnviar = tarjetasCredito;
     this.json.guardarPago(this.productoEnviar).subscribe( data => {
     console.log('Se realizo el pago.');
    });
  }

}
