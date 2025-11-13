export interface Recebivel {
  RecebivelId: string;
  StatusRecebivel: string;
  NumeroDocumento: string | null;
  DataEmissao: string;
  DataVencimento: string;
  NomeEmpresa: string;
}

export interface Empresa {
  EmpresaId: string;
  Nome: string;
}

export interface Fundo {
  FundoId: string;
  Nome: string;
}

export type ObjectResponse<T> = {
  Value: T;
};
