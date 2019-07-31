import {Body, Controller, UseInterceptors, UploadedFile, Get, Post, Res, Session, Param} from "@nestjs/common";
import { FileInterceptor } from  '@nestjs/platform-express';
import {Vestido, VestidoService} from "./vestido.service";
import {storage} from '../uploader/uploader';
import { UsuarioService } from '../usuario/usuario.service';
@Controller('/vestido')
export class VestidoController {
    constructor(
        private readonly _vestidoService:VestidoService,
        private readonly _usuarioService: UsuarioService
    )
    {}

    @Get('registrar/:username')
    async registrarVestido(
        @Res() response,
        @Session() session,
        @Param('username') username: string
    )
    {
        this._usuarioService.buscar(
            {
                select: ['idUsuario', 'nombreCompleto', 'nombreCompleto', 'direccion',
                    'fechaNac', 'usuario', 'telefono'],
                where: [{ 'usuario': username }],
            },
        ).then(
            value => {
                value.forEach(
                    i => {
                        // console.log(i.idUsuario);
                        response.render('vestido/vestido_registro',
                            { valor: i, username: session.username.toUpperCase() });
                    },
                );
            },
        ).catch(
            reason => {
                console.log(reason);
                response.status(400);
                response.send({ mensaje: 'Error de consulta', error: 400 });
            },
        );
    }


    @Post('crear/:idUsuario')@UseInterceptors(
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
        @UploadedFile() file,
        @Res() res
    ){
        vestido.usuario = idUsuario;
        vestido.estadoVenta=false;
        file.path=file.path.replace("publico","");
        vestido.imagenVestido = file.path.split("\\").join("/");
        const usuario = await this._usuarioService.buscar({
            where:[
                {usuario:session.username}
                ]
        })[0];
        vestido.usuario=usuario;
        const vestido_nuevo = await this._vestidoService.crear(vestido);
        console.log(vestido_nuevo);
        res.redirect('/tienda/tienda');
    }

    @Get('listar')
    async getVestidos(
    ) {
        return await this._vestidoService.buscar();
    }
}
