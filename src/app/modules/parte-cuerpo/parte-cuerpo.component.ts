import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ParteCuerpo } from 'src/app/core/model/ParteCupero';
import { ProviderService } from 'src/app/core/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parte-cuerpo',
  templateUrl: './parte-cuerpo.component.html',
  styleUrls: ['./parte-cuerpo.component.css']
})
export class ParteCuerpoComponent implements OnInit {

  modalRef?: BsModalRef;

  inputData: string | undefined;
  listGlobal: ParteCuerpo[] | undefined;
  title: string | undefined;
  idGlobal: any | undefined;
  selectId: any | undefined;

  constructor(private modalService: BsModalService,
              private _serviceGlobal: ProviderService) {}

  ngOnInit(): void {
    this.loadData();
  }

  openModal(template: TemplateRef<any>, data: string, item?: ParteCuerpo) {
    if(data === 'Crear'){
      this.title = 'Crear';
      this.inputData = '';
    }
    if(data === 'Editar'){
      this.title = 'Editar';
      this.idGlobal = item?.id_musculo;
      this.inputData = item?.dsc_musculo;
      if(item?.parteCuerpoHijo !== null){
        this.selectId = item?.parteCuerpoHijo.id_musculo;
      }
      
    }
    this.modalRef = this.modalService.show(template);
  }

  sendData(): void {
      if(this.inputData){
        if(this.title === 'Crear'){
          let json: any = {
            dsc_musculo: this.inputData,
            parteCuerpoHijo: this.selectId
          }
          this._serviceGlobal.postParteCuerpo(json).subscribe((resp: any) => {
            console.log(resp);
            this.loadData();
            this.modalRef?.hide();
          });
        }
        if(this.title === 'Editar'){
          let json: any = {
            dsc_musculo: this.inputData,
            parteCuerpoHijo: this.selectId
          }
          console.log(this.idGlobal, json);
          this._serviceGlobal.putParteCuerpo(this.idGlobal, json).subscribe((resp: any) => {
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
    this._serviceGlobal.getListParteCuerpo().subscribe((resp: any) => {
      for (let index = 0; index < resp.length; index++) {
        console.log(resp.parteCuerpoHijo);
        if(resp[index].parteCuerpoHijo === null){
          resp[index].validate = true;
          resp[index].aux = 'No tiene asignado';
        } else {
          resp[index].validate = false;
        }
      }
      console.log(resp);
      this.listGlobal = resp;
    });
  }

  delete(id: any): void {
    this._serviceGlobal.deleteParteCuerpo(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
    });
  }

}
