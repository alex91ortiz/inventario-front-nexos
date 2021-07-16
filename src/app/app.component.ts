import { Component } from '@angular/core';

import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventario-front-nexos';
  items: MenuItem[];
  ngOnInit() {
    this.items = [
      {
        label: 'Mercacia',
        routerLink: ['mercancia']
      },
      {
        label: 'Usuario',
        routerLink: ['usuario']
      },
      {
        label: 'Cargo',
        routerLink: ['cargo']
      },
      
    ];
  }
}
