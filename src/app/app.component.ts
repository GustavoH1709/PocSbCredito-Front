import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FiltroComponent } from './components/filtro/filtro.component';
import { ModalTaxaComponent } from './components/modal-taxa/modal-taxa.component';
import { TabelaComponent } from './components/tabela/tabela.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FiltroComponent,
    TabelaComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  abrirModalTaxa() {
    this.dialog.open(ModalTaxaComponent, {
      width: '400px',
    });
  }

  onFiltrar(filtro: { empresa: string; fundo: string }) {
    console.log('Filtro aplicado:', filtro);
    // Aqui futuramente você pode enviar o filtro pro backend ou filtrar a tabela
  }
}
