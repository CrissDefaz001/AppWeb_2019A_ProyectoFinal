import {Injectable} from "@nestjs/common";
import {VestidoEntity} from "./vestido.entity";
import {FindManyOptions, Repository} from "typeorm";

import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from "../usuario/usuario.entity";
import {Usuario} from "../../interfaces/usuario";

@Injectable()
export class VestidoService {
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

    buscar(parametros?: FindManyOptions): Promise<VestidoEntity[]> {
        return this._vestidoRepository.find(parametros)
    }

    async actualizarVestido(id: number, vestido: Vestido) {
        return await this._vestidoRepository
            .update(id, {
                talla: vestido.talla,
                color: vestido.color,
                precio: vestido.precio,
                estado: vestido.estado,
                descripcion: vestido.descripcion
            });
    }


}

export interface Vestido {
    id?: number;
    talla: string;
    color: string;
    precio: number;
    estado: string;
    descripcion: string;
    usuario?: UsuarioEntity,

}
