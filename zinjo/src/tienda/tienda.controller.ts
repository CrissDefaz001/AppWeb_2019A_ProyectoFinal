import {Body, Controller, UseInterceptors, UploadedFile, Get, Post, Res, Session, Param} from "@nestjs/common";
import { FileInterceptor } from  '@nestjs/platform-express';
import {Vestido, VestidoService} from "../vestido/vestido.service";
import {storage} from '../uploader/uploader';
import { UsuarioService } from '../usuario/usuario.service';
import {TiendaService} from "./tienda.service";


@Controller('/tienda')
export class TiendaController {
    constructor(private readonly _tiendaService: TiendaService) {
    }




    @Get('tienda')
   async mostrarTienda(@Session() session, @Res() res) {

        if (session.username) {
            try {
                const parametro = {
                    where:[
                        {estadoVenta:false}
                    ]
                };
                const vestidos=await this._tiendaService.buscar(parametro);
                res.render('tienda/tienda', {
                    username: session.username.toUpperCase(),

                    vestidos: vestidos

                });
            }catch (e) {
                console.error(e);
            }

        } else {
            res.redirect('/home/index');
        }
    }
}
