import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Especialista } from 'src/app/core/model/Especialista';
import { Registro } from 'src/app/core/model/Registro';
import { ProviderService } from 'src/app/core/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  modalRef?: BsModalRef;

  inputData: string | undefined;
  inputDate: any | undefined;
  listGlobal: Registro[] | undefined;
  listEspecialista: Especialista[] | undefined;
  selectId: number | undefined;
  title: string | undefined;
  idGlobal: any | undefined;

  constructor(private modalService: BsModalService,
              private _serviceGlobal: ProviderService) {}

  ngOnInit(): void {
    this.loadData();
  }

  openModal(template: TemplateRef<any>, data: string, item?: Registro) {
    if(data === 'Crear'){
      this.title = 'Crear';
      this.inputData = '';
    }
    if(data === 'Editar'){
      this.title = 'Editar';
      this.idGlobal = item?.id_registro;
      this.inputDate = item?.fecha_registro;
      this.selectId = item?.id_registro;
    }
    this.modalRef = this.modalService.show(template);
  }

  sendData(): void {
      if(this.selectId){
        if(this.title === 'Crear'){
          let json: any = {
            fecha_registro: this.inputDate,
            especialista: this.selectId
          }
          console.log(json);
          
          this._serviceGlobal.postRegistro(json).subscribe((resp: any) => {
            console.log(resp);
            this.loadData();
            this.modalRef?.hide();
          });
        }
        if(this.title === 'Editar'){
          let json: any = {
            fecha_registro: this.inputDate,
            especialista: this.selectId
          }
          console.log(this.idGlobal, json);
          this._serviceGlobal.putRegistro(this.idGlobal, json).subscribe((resp: any) => {
            console.log(resp);
            this.loadData();
            this.modalRef?.hide();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Debe ingresar todos los campos",
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
    this._serviceGlobal.getListRegistro().subscribe((resp: any) => {
      console.log(resp);
      this.listGlobal = resp;
    });

    this._serviceGlobal.getListEspecialista().subscribe((resp: any) => {
      console.log(resp);
      this.listEspecialista = resp;
    });
  }

  delete(id: any): void {
    this._serviceGlobal.deleteRegistro(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
    });
  }

}
