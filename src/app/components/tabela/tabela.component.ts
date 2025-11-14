import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { AppConfigService } from '../../core/services/app-config.service';
import { ObjectResponse, Recebivel } from '../../types/api';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, HttpClientModule],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent {
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.baseUrl = this.config.get('baseUrl');
  }

  ngOnInit(): void {
    this.carregarRecebiveis();
  }

  displayedColumns: string[] = [
    'select',
    'NomeEmpresa',
    'NumeroDocumento',
    'DataEmissao',
    'DataVencimento',
    'StatusRecebivel',
  ];

  dataSource: Recebivel[] = [];
  baseUrl: string = '';
  selection = new SelectionModel<Recebivel>(true, []);

  /** Traduz o status do recebível */
  traduzirStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      D: 'Disponível',
      A: 'Antecipado',
      L: 'Liquidado',
      C: 'Cancelado',
    };
    return statusMap[status] || status;
  }

  /** Verifica se a linha pode ser selecionada */
  podeSelecionar(row: Recebivel): boolean {
    return row.StatusRecebivel === 'D';
  }

  /** Seleciona ou desmarca uma linha */
  toggleRow(row: Recebivel): void {
    if (this.podeSelecionar(row)) {
      this.selection.toggle(row);
    }
  }

  /** Verifica se todas as linhas disponíveis estão selecionadas */
  isAllSelected(): boolean {
    const disponíveis = this.dataSource.filter(
      (r) => r.StatusRecebivel === 'D'
    );
    const selecionados = this.selection.selected.filter(
      (r) => r.StatusRecebivel === 'D'
    );
    return disponíveis.length > 0 && selecionados.length === disponíveis.length;
  }

  /** Marca ou desmarca todas as linhas disponíveis */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      // Seleciona apenas as linhas com status 'D'
      const disponíveis = this.dataSource.filter(
        (r) => r.StatusRecebivel === 'D'
      );
      this.selection.clear();
      this.selection.select(...disponíveis);
    }
  }

  /** Retorna as linhas selecionadas */
  getLinhasSelecionadas(): Recebivel[] {
    return this.selection.selected;
  }

  /** Aplica o filtro e recarrega os dados */
  aplicarFiltro(filtro: { EmpresaId?: number; FundoId?: number }): void {
    this.carregarRecebiveis(filtro);
  }

  carregarRecebiveis(filtro?: { EmpresaId?: number; FundoId?: number }): void {
    // Monta os parâmetros da requisição
    const params: Record<string, string> = {};

    // Adiciona os filtros se existirem e não forem vazios
    if (filtro?.EmpresaId) {
      params['EmpresaId'] = filtro.EmpresaId.toString();
    }

    if (filtro?.FundoId) {
      params['FundoId'] = filtro.FundoId.toString();
    }

    this.http
      .get<ObjectResponse<Recebivel[]>>(
        `${this.baseUrl}/Recebivel/listarRecebiveis`,
        { params }
      )
      .subscribe({
        next: (data) => {
          this.dataSource = data.Value;
          // Limpa a seleção ao carregar novos dados
          this.selection.clear();
        },
        error: (err) => console.error('Erro ao carregar recebiveis', err),
      });
  }
}
