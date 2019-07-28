import {Controller, Get, Res, Session,Param} from '@nestjs/common';
import {VentasService} from "./ventas.service";


@Controller('/ventas')
export class VentasController {

    constructor(
        private readonly _ventasService: VentasService,
    ) {
    }

    @Get('misventas/:idUsuario')
    async mostrarVentas(@Res() res, @Param('idUsuario') idUsuario: number,
                        @ Session() session,
    ) {
        const userid = session.idUsuario
        const username= session.username
        console.log('id:',userid,'nombre:', username)
        const arreglo = await this._ventasService.listar(userid);
        res.render('ventas/misventas', {
            username: session.username.toUpperCase(), Vestidos: arreglo
        })

    }
}


