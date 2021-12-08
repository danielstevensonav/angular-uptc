import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Especialista } from 'src/app/core/model/Especialista';
import { GrupoDeportivo } from 'src/app/core/model/GrupoDeportivo';
import { Registro } from 'src/app/core/model/Registro';
import { ProviderService } from 'src/app/core/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-deportivo',
  templateUrl: './grupo-deportivo.component.html',
  styleUrls: ['./grupo-deportivo.component.css']
})
export class GrupoDeportivoComponent implements OnInit {

  modalRef?: BsModalRef;

  inputData: number | undefined;
  listGlobal: GrupoDeportivo[] | undefined;
  listEspecialista: Especialista[] | undefined;
  selectId: number | undefined;
  selectId2: number | undefined;
  title: string | undefined;
  idGlobal: any | undefined;

  constructor(private modalService: BsModalService,
              private _serviceGlobal: ProviderService) {}

  ngOnInit(): void {
    this.loadData();
  }

  openModal(template: TemplateRef<any>, data: string, item?: GrupoDeportivo) {
    if(data === 'Crear'){
      this.title = 'Crear';
      this.inputData = 0;
    }
    if(data === 'Editar'){
      this.title = 'Editar';
      this.idGlobal = item?.csc_intentos;
      this.inputData = item?.intento;
      this.selectId = item?.especialista.id_especialista;
      this.selectId2 = item?.especialista2.id_especialista;
    }
    this.modalRef = this.modalService.show(template);
  }

  sendData(): void {
      if(this.selectId){
        if(this.selectId2){
          if(this.title === 'Crear'){
            let json: any = {
              intento: this.inputData,
              especialista: this.selectId,
              especialista2: this.selectId2
            }
            console.log(json);
            
            this._serviceGlobal.postGrupoDeportivo(json).subscribe((resp: any) => {
              console.log(resp);
              this.loadData();
              this.modalRef?.hide();
            });
          }
          if(this.title === 'Editar'){
            let json: any = {
              intento: this.inputData,
              especialista: this.selectId,
              especialista2: this.selectId2
            }
            console.log(this.idGlobal, json);
            this._serviceGlobal.putGrupoDeportivo(this.idGlobal, json).subscribe((resp: any) => {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Debe ingresar todos los campos",
      });
      }
  }

  loadData() : void {
    this._serviceGlobal.getListGrupoDeportivo().subscribe((resp: any) => {
      console.log(resp);
      for (let index = 0; index < resp.length; index++) {
        console.log(resp.especialista);
        if(resp[index].especialista === null){
          resp[index].validate = true;
          resp[index].aux = 'No tiene asignado';
        } else {
          resp[index].validate = false;
        }
        if(resp[index].especialista2 === null){
          resp[index].validate = true;
          resp[index].aux = 'No tiene asignado';
        } else {
          resp[index].validate = false;
        }
      }
      console.log(resp);
      this.listGlobal = resp;
    });

    this._serviceGlobal.getListEspecialista().subscribe((resp: any) => {
      console.log(resp);
      this.listEspecialista = resp;
    });
  }

  delete(id: any): void {
    this._serviceGlobal.deleteGrupoDeportivo(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
    });
  }

}
