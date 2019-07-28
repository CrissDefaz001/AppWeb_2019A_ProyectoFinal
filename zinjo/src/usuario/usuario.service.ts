import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Usuario } from '../../interfaces/usuario';
import { Repository } from 'typeorm';

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

  async actualizarUsuario(id:number, usuario:Usuario){
    return await this._UsuarioRepository
      .update(id,{
        nombreCompleto: usuario.nombreCompleto,
        usuario: usuario.usuario,
        direccion: usuario.direccion,
        telefono:usuario.telefono,
      fechaNac: usuario.fechaNac});
  }

  async actualizarContrasenia(id:number, usuario:Usuario){
    return await this._UsuarioRepository
      .update(id,{ passwordUno: usuario.passwordUno, passwordDos: usuario.passwordDos });
  }


}
