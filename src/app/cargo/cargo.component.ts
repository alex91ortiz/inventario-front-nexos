import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/models/Cargo';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CargoService } from '../servicies/cargo.service';
@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit {
  cargoDialog: boolean;
  cargos: Cargo[];
  cargo: Cargo;
  selectedCargos: Cargo[];
  submitted: boolean;
  constructor(private cargoService: CargoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.cargoService.getAll().subscribe(data => {
      console.log(data);
      if (data) {
        this.cargos = data
      }
    }, error => { console.log(error) });


  }

  openNew() {
    this.cargo = {};
    this.submitted = false;
    this.cargoDialog = true;
  }

  deleteSelectedCargo() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected cargos?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.cargos = this.cargos.filter(val => !this.selectedCargos.includes(val));
        this.selectedCargos = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cargoss Deleted', life: 3000 });
      }
    });
  }

  editCargo(cargo: Cargo) {
    this.cargo = { ...cargo };
    this.cargoDialog = true;
  }

  deleteCargo(cargo: Cargo) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + cargo.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cargoService.delete(cargo.id).subscribe(data => {
          this.cargos = this.cargos.filter(val => val.id !== cargo.id);
          this.cargo = {};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cargos Deleted', life: 3000 });
        }, error => { console.log(error); });
      }
    });
  }

  hideDialog() {
    this.cargoDialog = false;
    this.submitted = false;
  }

  saveCargo() {
    this.submitted = true;

    if (this.cargo.nombre.trim()) {
      if (this.cargo.id) {
        this.cargos[this.findIndexById(this.cargo.id)] = this.cargo;
        this.cargoService.update(this.cargo.id, this.cargo).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cargos Updated', life: 3000 });
        }, error => { console.log(error); });
      } else {
        this.cargos.push(this.cargo);
        this.cargoService.create(this.cargo).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cargos Created', life: 3000 });
        }, error => { console.log(error); });
      }

      this.cargos = [...this.cargos];
      this.cargoDialog = false;
      this.cargo = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.cargos.length; i++) {
      if (this.cargos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
