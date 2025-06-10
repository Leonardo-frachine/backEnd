import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PacienteService {
  constructor(private prisma: PrismaService) {}
  private mapToEntity(paciente: any): Paciente {
    return {
      id: paciente.id,
      nome: paciente.nome,
      idade: paciente.idade,
      telefone: paciente.telefone,
      endereco: paciente.endereco
    };
  }
  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = await this.prisma.paciente.create({
      data: {
        nome: createPacienteDto.nome,
        idade: createPacienteDto.idade,
        telefone: createPacienteDto.telefone,
        endereco: createPacienteDto.endereco
      },
    });
    return this.mapToEntity(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    const paciente = await this.prisma.paciente.findMany();
    return paciente.map((paciente) => this.mapToEntity(paciente));
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new Error(`Paciente com id ${id} não encontrado`);
    }

    return this.mapToEntity(paciente);
  }

  async update(
    id: string,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const pacienteExistente = await this.prisma.paciente.findUnique({
      where: { id },
    });

    if (!pacienteExistente) {
      throw new NotFoundException(`paciente com ${id}nao encontrado`);
    }
    const pacienteAtualizado = await this.prisma.paciente.update({
      where: { id },
      data: updatePacienteDto,
    });
    return this.mapToEntity(pacienteAtualizado);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.paciente.delete({
      where: { id },
    });
  }
}
