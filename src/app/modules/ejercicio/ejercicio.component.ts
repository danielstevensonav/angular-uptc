import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Ejercicio } from 'src/app/core/model/Ejercicio';
import { TipoEjercicio } from 'src/app/core/model/TipoEjercicio';
import { ProviderService } from 'src/app/core/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {

  modalRef?: BsModalRef;

  inputData: string | undefined;
  inputDataDesc: string | undefined;
  selectId: number | undefined;
  listGlobal: Ejercicio[] | undefined;
  title: string | undefined;
  idGlobal: any | undefined;
  listTipoEjercicio: TipoEjercicio[] | undefined;

  constructor(private modalService: BsModalService,
              private _serviceGlobal: ProviderService) {}

  ngOnInit(): void {
    this.loadData();
  }

  openModal(template: TemplateRef<any>, data: string, item?: Ejercicio) {
    if(data === 'Crear'){
      this.title = 'Crear';
      this.inputData = '';
    }
    if(data === 'Editar'){
      this.title = 'Editar';
      this.idGlobal = item?.id_ejercicio;
      this.inputData = item?.nombre_ejercicio;
      this.inputDataDesc = item?.dsc_ejercicio;
      this.selectId = item?.tipoEjercicio;
      
    }
    this.modalRef = this.modalService.show(template);
  }

  sendData(): void {
      if(this.inputData){
        if(this.title === 'Crear'){
          let json: any = {
            nombre_ejercicio: this.inputData,
            dsc_ejercicio: this.inputDataDesc,
            tipoEjercicio: this.selectId
          }
          console.log(json);
          this._serviceGlobal.postEjercicio(json).subscribe((resp: any) => {
            console.log(resp);
            this.loadData();
            this.modalRef?.hide();
          });
        }
        if(this.title === 'Editar'){
          let json: any = {
            nombre_ejercicio: this.inputData,
            dsc_ejercicio: this.inputDataDesc,
            tipoEjercicio: this.selectId
          }
          console.log(this.idGlobal, json);
          this._serviceGlobal.putEjercicio(this.idGlobal, json).subscribe((resp: any) => {
            console.log(resp);
            this.loadData();
            this.modalRef?.hide();
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Debe ingresar todos los campos",
      });
      }
  }

  loadData() : void {
    this._serviceGlobal.getListEjercicio().subscribe((resp: any) => {
      console.log(resp);
      this.listGlobal = resp;
    });

    this._serviceGlobal.getListTipoEjercicio().subscribe((resp: any) => {
      console.log(resp);
      this.listTipoEjercicio = resp;
    });
  }

  delete(id: any): void {
    this._serviceGlobal.deleteEjercicio(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
    });
  }

}
