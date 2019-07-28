import {Body, Controller, Get, Post, Res, Session} from '@nestjs/common';
import {VentasService} from "./ventas.service";


@Controller('/ventas')
export class VentasController {

    constructor(
        private readonly _ventasService: VentasService
    ) {
    }

    @Get('misventas')
    async mostrarVentas(@Res() res,
                        @ Session() session,
    ) {
        const user = await this._ventasService.consultarIdUsuario(session.username.toLowerCase())
        const userid = user[0].idUsuario

        //const username = session.username

       // console.log('id:', userid.toString(), 'nombre:', username, typeof (userid))

        const arreglo = await this._ventasService.listar(userid);

        res.render('ventas/misventas', {
            username: session.username.toUpperCase(), Vestidos: arreglo
        })

    }

    @Post('eliminarPub')
    async elimVestido(@Res() res, @ Session() session,@Body('idelim') idVestido: number ) {

        await this._ventasService.eliminarPub(idVestido)

        const user = await this._ventasService.consultarIdUsuario(session.username.toLowerCase())
        const userid = user[0].idUsuario
        const arreglo = await this._ventasService.listar(userid);
        res.render('ventas/misventas', {
            username: session.username.toUpperCase(), Vestidos: arreglo
        })
    }
}



