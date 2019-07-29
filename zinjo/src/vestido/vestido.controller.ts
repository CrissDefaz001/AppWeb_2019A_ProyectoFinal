import {Body, Controller, Get, Param, Post, Res, Session, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from '@nestjs/platform-express';
import {Vestido, VestidoService} from "./vestido.service";
import {storage} from '../uploader/uploader';
import {UsuarioService} from '../usuario/usuario.service';
import {Usuario} from "../../interfaces/usuario";

@Controller('/vestido')
export class VestidoController {
    constructor(
        private readonly _vestidoService: VestidoService,
        private readonly _usuarioService: UsuarioService
    ) {
    }

    @Get('registrar/:username')
    async registrarVestido(
        @Res() response,
        @Session() session,
        @Param('username') username: string
    ) {
        this._usuarioService.buscar(
            {
                select: ['idUsuario', 'nombreCompleto', 'nombreCompleto', 'direccion',
                    'fechaNac', 'usuario', 'telefono'],
                where: [{'usuario': username}],
            },
        ).then(
            value => {
                value.forEach(
                    i => {
                        // console.log(i.idUsuario);
                        response.render('vestido/vestido_registro',
                            {valor: i, username: session.username.toUpperCase()});
                    },
                );
            },
        ).catch(
            reason => {
                console.log(reason);
                response.status(400);
                response.send({mensaje: 'Error de consulta', error: 400});
            },
        );
    }


    @Post('crear/:idUsuario') @UseInterceptors(
        FileInterceptor(
            'pic',
            {
                storage: storage
            }
        )
    )
    async registrarVestidoPost(
        @Res() response,
        @Session() session,
        @Param('idUsuario') idUsuario,
        @Body() vestido: Vestido,
    ) {
        vestido.usuario = idUsuario
        const vestido_nuevo = await this._vestidoService.crear(vestido);
        console.log(vestido_nuevo);
    }

    @Get('listar')
    async getVestidos() {
        return await this._vestidoService.buscar();
    }

    @Get('editar/:idvestido')
    editarUsuario(@Res() res, @Param('idvestido') idvestido: string, @Session() session) {
        this._vestidoService.buscar(
            {
                select: ['id', 'talla', 'color', 'estado','precio',
                    'descripcion'],
                where: [{'id': idvestido}],
            },
        ).then(
            value => {
                value.forEach(
                    i => {
                        // console.log(i.idUsuario);
                        res.render('vestido/vestido_editar',
                            {valor: i, username: session.username.toUpperCase()});
                    },
                );
            },
        ).catch(
            reason => {
                console.log(reason);
                res.status(400);
                res.send({mensaje: 'Error de consulta', error: 400});
            },);
    }




    @Post('editar/:idVestido')
    editarUsuarioPost(@Res() res, @Body() vestido: Vestido,
                      @Param('idVestido') idVestido: number, @Session() session) {
        this._vestidoService.actualizarVestido(idVestido, vestido)
            .then(value => {
                console.log(value);
                console.log('Vestido actualizado');
                // Actualizando usuario de sesion

            })
            .catch(reason => {
                console.log(reason);
                res.status(400);
                res.send({ mensaje: 'Error actualizando', error: 400 });
            });
    }


}