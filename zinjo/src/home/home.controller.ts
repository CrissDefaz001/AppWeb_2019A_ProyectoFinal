import {Controller, Get, Res} from '@nestjs/common';
import {HomeService} from "./home.service";


@Controller()
export class HomeController {
    constructor(private readonly inicioService: HomeService) {}

    @Get()
    getHello(): string {
        return this.inicioService.getHello();
    }

    @Get('home')
    mostrarInicio(@Res() res) {
        res.render('home/home')
    }

}
