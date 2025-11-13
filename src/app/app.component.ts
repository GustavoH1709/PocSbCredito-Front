import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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

  @ViewChild(TabelaComponent)
  tabela!: TabelaComponent;

  filtroAtual: { EmpresaId?: number; FundoId?: number } = {};

  abrirModalTaxa() {
    // Valida se os filtros obrigatórios foram selecionados
    if (!this.filtroAtual.EmpresaId) {
      alert('Por favor, selecione uma Empresa antes de definir a taxa');
      return;
    }

    if (!this.filtroAtual.FundoId) {
      alert('Por favor, selecione um Fundo antes de definir a taxa');
      return;
    }

    // Pega as linhas selecionadas antes de abrir o modal
    const linhasSelecionadas = this.tabela.getLinhasSelecionadas();

    if (linhasSelecionadas.length === 0) {
      alert('Selecione pelo menos um recebível');
      return;
    }

    console.log('Linhas selecionadas:', linhasSelecionadas);
    console.log('Filtros aplicados:', this.filtroAtual);

    const dialogRef = this.dialog.open(ModalTaxaComponent, {
      width: '400px',
      data: {
        linhasSelecionadas,
        EmpresaId: this.filtroAtual.EmpresaId,
        FundoId: this.filtroAtual.FundoId,
      },
    });

    // Opcional: fazer algo após fechar o modal
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        console.log('Modal fechado com sucesso:', result);
        // Recarregar a tabela
        this.tabela.aplicarFiltro(this.filtroAtual);
      }
    });
  }

  onFiltrar(filtro: { EmpresaId?: number; FundoId?: number }) {
    console.log('Filtro aplicado:', filtro);
    this.filtroAtual = filtro;

    // Aplica o filtro na tabela automaticamente
    this.tabela.aplicarFiltro(filtro);
  }

  // Método auxiliar para obter linhas selecionadas a qualquer momento
  obterLinhasSelecionadas() {
    const linhasSelecionadas = this.tabela.getLinhasSelecionadas();
    console.log('Linhas selecionadas:', linhasSelecionadas);
    return linhasSelecionadas;
  }
}
