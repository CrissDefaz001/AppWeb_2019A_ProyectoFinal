import {Injectable} from "@nestjs/common";
import {VestidoEntity} from "../vestido/vestido.entity";
import {FindManyOptions, Repository} from "typeorm";

import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class TiendaService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(VestidoEntity)
        private readonly _vestidoRepository: Repository<VestidoEntity>,
    ) {
    }


    async crear(nuevoVestido: Vestido): Promise<VestidoEntity> {

        // Instanciar una entidad -> .create()
        const vestidoEntity = this._vestidoRepository
            .create(nuevoVestido);

        // Guardar una entidad en la BDD -> .save()
        const vestidoCreado = await this._vestidoRepository
            .save(vestidoEntity);

        return vestidoCreado;
    }

    buscar(parametros?:FindManyOptions):Promise<VestidoEntity[]>{
        return this._vestidoRepository.find(parametros)
    }


}

export interface Vestido {
    id?:number;
    talla:string;
    color:string;
    precio:number;
    estado:string;
    descripcion:string;
    estadoVenta:boolean;
    usuario?:UsuarioEntity,

}
