import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppConfigService } from '../../core/services/app-config.service';
import { Empresa, Fundo, ObjectResponse } from '../../types/api';

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
  baseUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private config: AppConfigService
  ) {
    this.form = this.fb.group({
      EmpresaId: [''],
      FundoId: [''],
    });

    this.baseUrl = this.config.get('baseUrl');
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
      .get<ObjectResponse<Empresa[]>>(`${this.baseUrl}/Empresa/listarEmpresas`)
      .subscribe({
        next: (data) => (this.empresas = data.Value),
        error: (err) => console.error('Erro ao carregar empresas', err),
      });
  }

  carregarFundos(): void {
    this.http
      .get<ObjectResponse<Fundo[]>>(`${this.baseUrl}/FundoFIDC/listarFundos`)
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
