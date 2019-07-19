import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../../interfaces/usuario';

@Injectable()
export class UsuarioService {

  constructor(@InjectRepository(UsuarioEntity)
              private readonly _UsuarioRepository: Repository<UsuarioEntity>) {

  }

  crearUsuario(nuevoUsuario: Usuario): Promise<Usuario> {
    const objetoEntidad = this._UsuarioRepository
      .create(nuevoUsuario);
    return this._UsuarioRepository
      .save(objetoEntidad);
  }

  async buscar(parametrosBusqueda?):Promise<Usuario[]>{
    return await this._UsuarioRepository.find(parametrosBusqueda)
  }

}
