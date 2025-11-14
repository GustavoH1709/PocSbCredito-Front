import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppConfigService } from '../../core/services/app-config.service';
import { Recebivel } from '../../types/api';

interface ModalData {
  linhasSelecionadas?: Recebivel[];
  taxaMensal?: number;
  EmpresaId?: number;
  FundoId?: number;
}

@Component({
  selector: 'app-modal-taxa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './modal-taxa.component.html',
  styleUrls: ['./modal-taxa.component.scss'],
})
export class ModalTaxaComponent {
  form: FormGroup;
  linhasSelecionadas: Recebivel[] = [];
  empresaId?: number;
  fundoId?: number;
  salvando: boolean = false;
  baseUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalTaxaComponent>,
    private http: HttpClient,
    private config: AppConfigService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {
    this.form = this.fb.group({
      taxaMensal: [
        data?.taxaMensal ?? '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.linhasSelecionadas = data?.linhasSelecionadas ?? [];
    this.empresaId = data?.EmpresaId;
    this.fundoId = data?.FundoId;
    this.baseUrl = this.config.get('baseUrl');
  }

  salvar() {
    // Validação de campos obrigatórios
    if (!this.empresaId) {
      alert('É necessário selecionar uma Empresa nos filtros');
      return;
    }

    if (!this.fundoId) {
      alert('É necessário selecionar um Fundo nos filtros');
      return;
    }

    if (this.linhasSelecionadas.length === 0) {
      alert('Nenhum recebível selecionado');
      return;
    }

    if (!this.form.valid) {
      if (this.form.controls['taxaMensal'].hasError('max')) {
        alert('A taxa mensal não pode ser maior que 100%');
      } else {
        alert('Preencha a taxa mensal corretamente');
      }
      return;
    }

    this.salvando = true;

    const taxaMensal = this.form.value.taxaMensal;

    const payload = {
      TaxaMensal: taxaMensal,
      Recebiveis: this.linhasSelecionadas.map((r) => r.RecebivelId),
      EmpresaId: this.empresaId,
      FundoId: this.fundoId,
    };

    console.log('Enviando para o backend:', payload);

    this.http
      .post(`${this.baseUrl}/OperacaoAntecipacao/antecipar`, payload)
      .subscribe({
        next: (response) => {
          console.log('Sucesso:', response);
          this.salvando = false;
          this.dialogRef.close({ success: true, data: response });
        },
        error: (err) => {
          console.error('Erro ao salvar:', err);
          this.salvando = false;
          alert('Erro ao salvar taxa. Tente novamente.');
        },
      });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
