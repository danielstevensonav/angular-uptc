import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Especialista } from 'src/app/core/model/Especialista';
import { ProviderService } from 'src/app/core/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {

  modalRef?: BsModalRef;

  inputData: string | undefined;
  inputDate: any | undefined;
  inputTarjeta: string | undefined;
  listGlobal: Especialista[] | undefined;
  title: string | undefined;
  idGlobal: any | undefined;

  constructor(private modalService: BsModalService,
              private _serviceGlobal: ProviderService) {}

  ngOnInit(): void {
    this.loadData();
  }

  openModal(template: TemplateRef<any>, data: string, item?: Especialista) {
    if(data === 'Crear'){
      this.title = 'Crear';
      this.inputData = '';
      this.inputTarjeta = '';
    }
    if(data === 'Editar'){
      this.title = 'Editar';
      this.idGlobal = item?.id_especialista;
      this.inputData = item?.nombre;
      this.inputDate = item?.fecha_nacimiento;
      this.inputTarjeta = item?.tarjeta_profesional;
      
    }
    this.modalRef = this.modalService.show(template);
  }

  sendData(): void {
      if(this.inputData){
        if(this.title === 'Crear'){
          let json: any = {
            nombre: this.inputData,
            fecha_nacimiento: this.inputDate,
            tarjeta_profesional: this.inputTarjeta
          }
          this._serviceGlobal.postEspecialista(json).subscribe((resp: any) => {
            console.log(resp);
            this.loadData();
            this.modalRef?.hide();
          });
        }
        if(this.title === 'Editar'){
          let json: any = {
            nombre: this.inputData,
            fecha_nacimiento: this.inputDate,
            tarjeta_profesional: this.inputTarjeta
          }
          console.log(this.idGlobal, json);
          this._serviceGlobal.putEspecialista(this.idGlobal, json).subscribe((resp: any) => {
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
    this._serviceGlobal.getListEspecialista().subscribe((resp: any) => {
      console.log(resp);
      this.listGlobal = resp;
    });
  }

  delete(id: any): void {
    this._serviceGlobal.deleteEspecialista(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
    });
  }

}
