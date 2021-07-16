import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MercanciaComponent } from './mercancia/mercancia.component';
import { CargoComponent } from './cargo/cargo.component';
import { UsuarioComponent } from './usuario/usuario.component';
const routes: Routes = [
  {
    path: 'mercancia',
    component: MercanciaComponent
  },
  {
    path: 'cargo',
    component: CargoComponent,
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  }
];

const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config), FormsModule, BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
