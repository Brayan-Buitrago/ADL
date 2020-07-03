import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsolidadoService } from '../../../servicios/perfil/consolidado.service';
import {TranslateService} from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Globales } from '../../globales';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent implements OnInit {

  @ViewChild('modalDetalle') modal: ElementRef;
  productos: any;
  creditos = [];
  activarCredito = false;
  modaResulDetalle: any;
  detalleCreditoModal: any;
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
    const creditos = [];
    let activarCredito = false;
    const banco = this.globales.banco;
    const productoCredito = this.globales.tipoCuentas.credito;
    if (this.productos) {
    this.productos.map( (obj) => {
      if (obj.accountInformation.bank === banco && !activarBancos) {
        if (obj.typeAccount === productoCredito) {
          activarCredito = true;
          creditos.push(obj);
        }
      }else{
        if (obj.typeAccount === productoCredito && activarBancos) {
          activarCredito = true;
          creditos.push(obj);
        }
      }
    });
  }
    this.activarCredito = activarCredito;
    this.creditos = creditos;
  }


  verDetalle = (credito) => {
    this.detalleCreditoModal = credito;
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
