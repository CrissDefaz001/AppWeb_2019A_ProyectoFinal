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

    buscarOne(id:number):Promise<VestidoEntity>{
        return  this._vestidoRepository.findOne(id);
    }

    actualizar(id:number,vestido:VestidoEntity):Promise<VestidoEntity>{
        vestido.id=id;
        const obj = this._vestidoRepository.create(vestido);
        return this._vestidoRepository.save(obj);
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
