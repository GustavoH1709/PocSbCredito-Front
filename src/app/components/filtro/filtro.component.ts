import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Empresa, Fundo, ObjectResponse } from '../../types/api';

const baseUrl = 'https:/localhost:44374';

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
    EmpresaId?: number;
    FundoId?: number;
  }>();

  @Input() titulo: string = '';

  form: FormGroup;

  empresas: Empresa[] = [];
  fundos: Fundo[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      EmpresaId: [''],
      FundoId: [''],
    });
  }

  ngOnInit(): void {
    this.carregarEmpresas();
    this.carregarFundos();

    // Emite automaticamente quando os valores mudarem
    this.form.valueChanges.subscribe(() => {
      this.onFiltrar();
    });
  }

  carregarEmpresas(): void {
    this.http
      .get<ObjectResponse<Empresa[]>>(`${baseUrl}/Empresa/listarEmpresas`)
      .subscribe({
        next: (data) => (this.empresas = data.Value),
        error: (err) => console.error('Erro ao carregar empresas', err),
      });
  }

  carregarFundos(): void {
    this.http
      .get<ObjectResponse<Fundo[]>>(`${baseUrl}/FundoFIDC/listarFundos`)
      .subscribe({
        next: (data) => (this.fundos = data.Value),
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
