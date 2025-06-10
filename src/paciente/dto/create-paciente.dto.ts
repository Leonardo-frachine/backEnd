import { IsBoolean, IsInt, IsNumber, IsDate } from 'class-validator';
export class CreatePacienteDto {
  nome: string;
  idade: number;
  telefone: string;
  endereco: string;
}
