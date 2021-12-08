import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Ejercicio } from 'src/app/core/model/Ejercicio';
import { MusculoEjercicio } from 'src/app/core/model/MusculoEjercicio';
import { ParteCuerpo } from 'src/app/core/model/ParteCupero';
import { ProviderService } from 'src/app/core/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-musculo-ejercicio',
  templateUrl: './musculo-ejercicio.component.html',
  styleUrls: ['./musculo-ejercicio.component.css']
})
export class MusculoEjercicioComponent implements OnInit {

  modalRef?: BsModalRef;

  inputData: string | undefined;
  listGlobal: MusculoEjercicio[] | undefined;
  title: string | undefined;
  selectIdEjercicio: any | undefined;
  selectIdParte: any | undefined;
  listEjercicio: Ejercicio[] | undefined;
  listParte: ParteCuerpo[] | undefined;

  constructor(private modalService: BsModalService,
              private _serviceGlobal: ProviderService) {}

  ngOnInit(): void {
    this.loadData();
  }

  openModal(template: TemplateRef<any>, data: string, item?: MusculoEjercicio) {
    if(data === 'Crear'){
      this.title = 'Crear';
    }
    this.modalRef = this.modalService.show(template);
  }

  sendData(): void {
      if(this.selectIdEjercicio){
        if(this.selectIdParte){
          if(this.title === 'Crear'){
            let json: any = {
              ejercicio: this.selectIdEjercicio,
              parteCuerpo: this.selectIdParte
            }
            this._serviceGlobal.postMusculoEjercicio(json).subscribe((resp: any) => {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Debe ingresar todos los campos",
        });
      }
  }

  loadData() : void {
    this._serviceGlobal.getListMusculoEjercicio().subscribe((resp: any) => {
      console.log(resp);
      this.listGlobal = resp;
    });
    this._serviceGlobal.getListEjercicio().subscribe((resp: any) => {
      console.log(resp);
      this.listEjercicio = resp;
    });

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
      this.listParte = resp;
    });
  }

  delete(item: any): void {
    let json: any = {
              ejercicio: parseInt(item.ejercicio_id_ejercicio),
              parteCuerpo: parseInt(item.id_musculo)
            }
    this._serviceGlobal.deleteMusculoEjercicio(JSON.stringify(json)).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
    });
  }

}
