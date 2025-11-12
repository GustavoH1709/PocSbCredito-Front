import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

interface Documento {
  nomeEmpresa: string;
  numeroDocumento: string;
  dataEmissao: string;
  dataVencimento: string;
  StatusRecebivel: string;
}

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent {
  displayedColumns: string[] = [
    'select',
    'nomeEmpresa',
    'numeroDocumento',
    'dataEmissao',
    'dataVencimento',
    'StatusRecebivel',
  ];

  dataSource: Documento[] = [
    {
      nomeEmpresa: 'ABC Ltda',
      numeroDocumento: 'DOC001',
      dataEmissao: '2025-01-10',
      dataVencimento: '2025-02-10',
      StatusRecebivel: 'D',
    },
    {
      nomeEmpresa: 'XPTO S/A',
      numeroDocumento: 'DOC002',
      dataEmissao: '2025-01-15',
      dataVencimento: '2025-02-15',
      StatusRecebivel: 'D',
    },
    {
      nomeEmpresa: 'TechCorp Ltda',
      numeroDocumento: 'DOC003',
      dataEmissao: '2025-02-01',
      dataVencimento: '2025-03-01',
      StatusRecebivel: 'D',
    },
  ];

  selection = new SelectionModel<Documento>(true, []);

  /** Seleciona ou desmarca uma linha */
  toggleRow(row: Documento): void {
    this.selection.toggle(row);
  }

  /** Verifica se todas estão selecionadas */
  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.length;
  }

  /** Marca ou desmarca todas */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource);
    }
  }
}
