import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

interface Empresa {
  empresaId: number;
  nome: string;
}

interface Fundo {
  fundoId: number;
  nome: string;
}

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {
  @Output() filtrar = new EventEmitter<{
    empresaId?: number;
    fundoId?: number;
  }>();

  form: FormGroup;

  empresas: Empresa[] = [];
  fundos: Fundo[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      empresaId: [''],
      fundoId: [''],
    });
  }

  ngOnInit(): void {
    this.carregarEmpresas();
    this.carregarFundos();
  }

  carregarEmpresas(): void {
    this.http.get<Empresa[]>('/api/empresas').subscribe({
      next: (data) => (this.empresas = data),
      error: (err) => console.error('Erro ao carregar empresas', err),
    });
  }

  carregarFundos(): void {
    this.http.get<Fundo[]>('/api/fundos').subscribe({
      next: (data) => (this.fundos = data),
      error: (err) => console.error('Erro ao carregar fundos', err),
    });
  }

  onFiltrar(): void {
    this.filtrar.emit(this.form.value);
  }

  limpar(): void {
    this.form.reset();
    this.filtrar.emit(this.form.value);
  }
}
