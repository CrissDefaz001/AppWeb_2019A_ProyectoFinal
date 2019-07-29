import {Module} from "@nestjs/common"
import {TypeOrmModule} from '@nestjs/typeorm';
import {VestidoEntity} from "./vestido.entity";
import {VestidoService} from "./vestido.service";
import {VestidoController} from "./vestido.controller";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {UsuarioService} from "../usuario/usuario.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([VestidoEntity,UsuarioEntity])
        ],
        controllers:[VestidoController],
        providers:[VestidoService,UsuarioService],
        exports:[VestidoService]

    }
)
export class VestidoModule {

}
