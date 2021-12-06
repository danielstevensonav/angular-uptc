import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoEjercicio } from 'src/app/core/model/TipoEjercicio';
import { ProviderService } from 'src/app/core/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-ejercicio',
  templateUrl: './tipo-ejercicio.component.html',
  styleUrls: ['./tipo-ejercicio.component.css']
})
export class TipoEjercicioComponent implements OnInit {

  modalRef?: BsModalRef;

  inputData: string | undefined;
  listGlobal: TipoEjercicio[] | undefined;
  title: string | undefined;
  idGlobal: any | undefined;

  constructor(private modalService: BsModalService,
              private _serviceGlobal: ProviderService) {}

  ngOnInit(): void {
    this.loadData();
  }

  openModal(template: TemplateRef<any>, data: string, item?: TipoEjercicio) {
    if(data === 'Crear'){
      this.title = 'Crear';
      this.inputData = '';
    }
    if(data === 'Editar'){
      this.title = 'Editar';
      this.idGlobal = item?.id_tipo_ejercicio;
      this.inputData = item?.dsc_tipo_ejercicio;
      
    }
    this.modalRef = this.modalService.show(template);
  }

  sendData(): void {
      if(this.inputData){
        if(this.title === 'Crear'){
          let json = {
            dsc_tipo_ejercicio: this.inputData
          }
          this._serviceGlobal.postTipoEjercicio(json).subscribe((resp: any) => {
            console.log(resp);
            this.loadData();
            this.modalRef?.hide();
          });
        }
        if(this.title === 'Editar'){
          let json = {
            dsc_tipo_ejercicio: this.inputData
          }
          console.log(this.idGlobal, json);
          this._serviceGlobal.putTipoEjercicio(this.idGlobal, json).subscribe((resp: any) => {
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
    this._serviceGlobal.getListTipoEjercicio().subscribe((resp: any) => {
      console.log(resp);
      this.listGlobal = resp;
    });
  }

  delete(id: any): void {
    this._serviceGlobal.deleteTipoEjercicio(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
    });
  }

}
