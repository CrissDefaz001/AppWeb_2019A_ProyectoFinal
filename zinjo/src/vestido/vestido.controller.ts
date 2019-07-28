import {Body, Controller, UseInterceptors, UploadedFile, Get, Post, Res, Session, Param} from "@nestjs/common";
import { FileInterceptor } from  '@nestjs/platform-express';
import {Vestido, VestidoService} from "./vestido.service";
import {storage} from '../uploader/uploader';

@Controller('/vestido')
export class VestidoController {
    constructor(
        private readonly _vestidoService:VestidoService,
    )
    {}

    @Get('registrar')
    registrarVestido(
        @Res() response,
        @Session() session,
        @Param('idUsuario') idUsuario: number
    )
    {
        response.render(
            'vestido/vestido_registro',
            {

                username: session.username.toUpperCase()

            }
        )
    }


    @Post('crear')@UseInterceptors(
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
        @Body() vestido: Vestido,
    ){

        const vestido_nuevo = await this._vestidoService.crear(vestido);
        console.log(vestido_nuevo);
    }

    @Get('listar')
    async getRoles(
    ) {
        return await this._vestidoService.buscar();
    }


}
