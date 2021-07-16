import { Component, OnInit } from '@angular/core';
import { Mercancia } from 'src/app/models/Mercancia';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MercanciaService } from '../servicies/mercancia.service';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../servicies/usuario.service';
@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrls: ['./mercancia.component.scss']
})
export class MercanciaComponent implements OnInit {
  mercanciaDialog: boolean;
  mercancias: Mercancia[];
  usuarios: Usuario[];
  mercancia: Mercancia;
  selectedMercancias: Mercancia[];
  submitted: boolean;
  isAdd: boolean;

  maxDate: Date;
  minDate: Date;
  constructor(private mercanciaService: MercanciaService,private usuarioService: UsuarioService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {

    // configuracion de fecha maxima
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    this.mercanciaService.getAll().subscribe(data => {
      console.log(data);
      if (data) {
        this.mercancias = data;
      }
    }, error => { console.log(error) });

    this.usuarioService.getAll().subscribe(data => {
      console.log(data);
      if (data) {
        this.usuarios = data;
      }
    }, error => { console.log(error) });
  }

  openNew() {
    this.mercancia = {};
    this.submitted = false;
    this.mercanciaDialog = true;
    this.isAdd = true;
  }

  deleteSelectedMercancia() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected mercancias?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.mercancias = this.mercancias.filter(val => !this.selectedMercancias.includes(val));
        this.selectedMercancias = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mercanciass Deleted', life: 3000 });
      }
    });
  }

  editMercancia(mercancia: Mercancia) {
    this.mercancia = { ...mercancia };
    this.mercanciaDialog = true;
    this.isAdd = false;
  }

  deleteMercancia(mercancia: Mercancia) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + mercancia.nombreproducto + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mercanciaService.delete(mercancia.id).subscribe(data => {
          this.mercancias = this.mercancias.filter(val => val.id !== mercancia.id);
          this.mercancia = {};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mercancias Deleted', life: 3000 });
        }, error => { console.log(error); });
      }
    });
  }

  hideDialog() {
    this.mercanciaDialog = false;
    this.submitted = false;
  }

  saveMercancia() {
    this.submitted = true;
    var validate = true;
    if(this.submitted && !this.mercancia.nombreproducto){
      validate = false;
    }else if(this.submitted && !this.mercancia.cantidad){
      validate = false;
    }else if(this.submitted && !this.mercancia.fechaingreso){
      validate = false;
    }else if(this.submitted && !this.mercancia.usuarioingreso){
      validate = false;
    }

    if (validate) {
      if (this.mercancia.id) {
        this.mercancias[this.findIndexById(this.mercancia.id)] = this.mercancia;
        this.mercanciaService.update(this.mercancia.id, this.mercancia).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mercancias Updated', life: 3000 });
        }, error => { console.log(error); 
            this.messageService.add({ severity: 'error', summary: 'UnSuccessful', detail: 'Mercancias Updated', life: 3000 });
        });
      } else {
        this.mercancias.push(this.mercancia);
        this.mercanciaService.create(this.mercancia).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mercancias Created', life: 3000 });
        }, error => { console.log(error); 
          this.messageService.add({ severity: 'error', summary: 'UnSuccessful', detail: 'Mercancias Created', life: 3000 });
        });
      }

      this.mercancias = [...this.mercancias];
      this.mercanciaDialog = false;
      this.mercancia = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.mercancias.length; i++) {
      if (this.mercancias[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
