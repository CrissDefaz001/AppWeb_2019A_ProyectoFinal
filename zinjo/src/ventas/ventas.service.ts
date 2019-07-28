import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {VestidoEntity} from "../vestido/vestido.entity";
import {Vestido} from "../vestido/vestido.service";
import {Usuario} from "../../interfaces/usuario";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {getManager} from "typeorm";

@Injectable()
export class VentasService {

    constructor(@InjectRepository(VestidoEntity)
                private readonly _VestidoRepository: Repository<VestidoEntity>,
                @InjectRepository(UsuarioEntity)
                private readonly _UsuarioRepository: Repository<UsuarioEntity>
    ) {

    }


    async listar(parametrosBusqueda?): Promise<Vestido[]> {
        const Vestido = await getManager()
            .createQueryBuilder(VestidoEntity, "vestido")
            .where("usuarioIdUsuario = :id", { id: parametrosBusqueda })
            .getMany();

        return  Vestido

    }

    async consultarIdUsuario(parametrosBusqueda?): Promise<Usuario[]> {
        return await this._UsuarioRepository.find({where: {usuario: parametrosBusqueda}})

    }
    async eliminarPub(parametroElim){
        await getManager()
            .createQueryBuilder()
            .delete()
            .from(VestidoEntity)
            .where("id = :id", { id: parametroElim })
            .execute();

    }
}
