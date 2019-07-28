import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {VestidoEntity} from "../vestido/vestido.entity";
import {Vestido} from "../vestido/vestido.service";

@Injectable()
export class VentasService {

    constructor(@InjectRepository(VestidoEntity)
                private readonly _VestidoRepository: Repository<VestidoEntity>) {

    }



    async listar(parametrosBusqueda?):Promise<Vestido[]>{
        return await this._VestidoRepository.find({where: {usuarioIdUsuario:parametrosBusqueda}})
    }
}
