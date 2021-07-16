import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../servicies/usuario.service';
import { Cargo } from '../models/Cargo';
import { CargoService } from '../servicies/cargo.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuarioDialog: boolean;
  usuarios: Usuario[];
  cargos: Cargo[];
  usuario: Usuario;
  selectedUsuarios: Usuario[];
  submitted: boolean;
  constructor(private usuarioService: UsuarioService,private cargoService: CargoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.usuarioService.getAll().subscribe(data => {
      console.log(data);
      if (data) {
        this.usuarios = data
      }
    }, error => { console.log(error) });

    this.cargoService.getAll().subscribe(data => {
      console.log(data);
      if (data) {
        this.cargos = data
      }
    }, error => { console.log(error) });
  }

  openNew() {
    this.usuario = {};
    this.submitted = false;
    this.usuarioDialog = true;
  }

  deleteSelectedUsuario() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected usuarios?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.usuarios = this.usuarios.filter(val => !this.selectedUsuarios.includes(val));
        this.selectedUsuarios = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarioss Deleted', life: 3000 });
      }
    });
  }

  editUsuario(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.usuarioDialog = true;
  }

  deleteUsuario(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + usuario.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.delete(usuario.id).subscribe(data => {
          this.usuarios = this.usuarios.filter(val => val.id !== usuario.id);
          this.usuario = {};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarios Deleted', life: 3000 });
        }, error => { console.log(error); });
      }
    });
  }

  hideDialog() {
    this.usuarioDialog = false;
    this.submitted = false;
  }

  saveUsuario() {
    this.submitted = true;

    if (this.usuario.nombre.trim()) {
      if (this.usuario.id) {
        this.usuarios[this.findIndexById(this.usuario.id)] = this.usuario;
        this.usuarioService.update(this.usuario.id, this.usuario).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarios Updated', life: 3000 });
        }, error => { console.log(error); });
      } else {
        this.usuarios.push(this.usuario);
        this.usuarioService.create(this.usuario).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarios Created', life: 3000 });
        }, error => { console.log(error); });
      }

      this.usuarios = [...this.usuarios];
      this.usuarioDialog = false;
      this.usuario = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
