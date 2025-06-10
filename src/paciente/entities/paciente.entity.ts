export class Paciente {
  id: string;
  nome: string;
  idade: number;
  telefone: string;
  endereco: string;

  constructor(
    id: string,
    nome: string,
    idade: number,
    telefone: string,
    endereco: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.telefone = telefone;
    this.endereco = endereco;
  }
}
