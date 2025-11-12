import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

interface Recebivel {
  RecebivelId: string;
  StatusRecebivel: string;
  NumeroDocumento: string | null;
  DataEmissao: string;
  DataVencimento: string;
  NomeEmpresa: string;
}

type ObjectResponse<T> = {
  Value: T;
};

const baseUrl = 'https:/localhost:44374';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, HttpClientModule],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent {
  constructor(private http: HttpClient) {}

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

  selection = new SelectionModel<Recebivel>(true, []);

  /** Seleciona ou desmarca uma linha */
  toggleRow(row: Recebivel): void {
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

  carregarRecebiveis(): void {
    this.http
      .get<ObjectResponse<Recebivel[]>>(`${baseUrl}/Recebivel/listarRecebiveis`)
      .subscribe({
        next: (data) => (this.dataSource = data.Value),
        error: (err) => console.error('Erro ao carregar recebiveis', err),
      });
  }
}
