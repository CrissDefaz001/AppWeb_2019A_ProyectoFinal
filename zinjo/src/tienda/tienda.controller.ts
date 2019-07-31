import {Controller, Get, Post, Res, Session, Param} from "@nestjs/common";

import { UsuarioService } from '../usuario/usuario.service';
import {TiendaService} from "./tienda.service";


@Controller('/tienda')
export class TiendaController {
    constructor(private readonly _tiendaService: TiendaService,
                private readonly _usuarioService: UsuarioService) {
    }




    @Get('tienda')
   async mostrarTienda(@Session() session, @Res() res) {

        if (session.username) {
            try {
                const usuario = await this._usuarioService.buscar({
                    where:[
                        {usuario:session.username}
                    ]
                })[0];
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

    @Post('comprar/:idVestido')
    async comprarVestido(
        @Res() res,
        @Param('idVestido') id:number,
        @Session() session
    ){
        if(session.username){
            try {
                const vestido = await this._tiendaService.buscarOne(id);
                vestido.estadoVenta=true;
                const resp = await this._tiendaService.actualizar(+id,vestido);
                console.log(resp);
                res.send({mensaje:'ok'});
            }catch (e) {
                console.error(e);
            }
        }else{
            res.redirect('/home/index');

        }
    }
    @Get('contacto')
    formulariocontacto(
        @Res() res,
        @Session() session
    ) {
        res.render('contacto/contacto',
            {username: session.username.toUpperCase()});
    }

}
