import { Module } from '@nestjs/common';
import {VentasController} from "./ventas.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {VentasService} from "./ventas.service";
import {VestidoEntity} from "../vestido/vestido.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([VestidoEntity]),TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [VentasController],
    providers: [VentasService],
})
export class VentasModule {
}
