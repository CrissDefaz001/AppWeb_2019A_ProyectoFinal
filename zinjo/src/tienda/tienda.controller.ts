import {Body, Controller, UseInterceptors, UploadedFile, Get, Post, Res, Session, Param} from "@nestjs/common";
import { FileInterceptor } from  '@nestjs/platform-express';
import {Vestido, VestidoService} from "../vestido/vestido.service";
import {storage} from '../uploader/uploader';
import { UsuarioService } from '../usuario/usuario.service';


@Controller('/tienda')
export class TiendaController {

    @Get('tienda')
    mostrarHome(@Res() res) {
        res.render('tienda/tienda');
    }


    @Get('principal')
    mostrarInicio(@Session() session, @Res() res) {

        if (session.username) {
            res.render('home/principal', {
                username: session.username.toUpperCase(),
            });
        } else {
            res.redirect('/home/index');
        }
    }
}
