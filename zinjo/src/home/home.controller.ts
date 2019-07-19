import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import {HomeService} from './home.service';

@Controller("/home")
export class HomeController {
    constructor(private readonly inicioService: HomeService) {}

    @Get('index')
    mostrarHome(@Res() res) {
        res.render('home/index');
    }

    @Get('principal')
    mostrarInicio(@Session() session, @Res() res) {
        if (session.username) {
            res.render('home/principal', {
                nombre: session.username.toUpperCase()
            });
        } else {
            res.redirect('/home/index');
        }
    }

    /*
    @Get('login')
    loginVista(@Res() res) {
        res.render('login');
    }
     */

    @Post('login')
    login(@Body() usuario, @Session() session, @Res() res ) {
        if (usuario.username === 'criss' && usuario.password === 'criss') {
            session.username = usuario.username;
            console.log(usuario);
            res.redirect('/home/principal');
        }else{
            res.status(400);
            res.send({mensaje:'Usuario No registrado',error:400})
        }
    }

    @Get('logout')
    logout(
      @Res() res,
      @Session() session,
    ) {
        session.username = undefined;
        session.destroy();
        res.redirect('/home/index');
    }

  @Get('registro')
  registrar(@Res() res) {
    res.render('form_registro/registro');
  }


  @Get('perfil')
  mostrarPerfil(@Session() session, @Res() res) {
        if (session.username) {
            res.render('perfil/perfil-usuario', {
                nombre: session.username.toUpperCase()
            });
        } else {
            res.redirect('/home/principal');
        }
    }

}
