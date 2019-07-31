import {Module} from "@nestjs/common"
import {TypeOrmModule} from '@nestjs/typeorm';
import {VestidoEntity} from "../vestido/vestido.entity";
import {TiendaService} from "./tienda.service";
import {TiendaController} from "./tienda.controller";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {UsuarioService} from "../usuario/usuario.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([VestidoEntity,UsuarioEntity])
        ],
        controllers:[TiendaController],
        providers:[TiendaService,UsuarioService],
        exports:[TiendaService]

    }
)
export class TiendaModule {

}
