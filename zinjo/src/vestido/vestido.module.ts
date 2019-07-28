import {Module} from "@nestjs/common"
import {TypeOrmModule} from '@nestjs/typeorm';
import {VestidoEntity} from "./vestido.entity";
import {VestidoService} from "./vestido.service";
import {VestidoController} from "./vestido.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([VestidoEntity])
        ],
        controllers:[VestidoController],
        providers:[VestidoService],
        exports:[VestidoService]

    }
)
export class VestidoModule {

}
