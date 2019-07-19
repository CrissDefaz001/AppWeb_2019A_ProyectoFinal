import { Controller, Get, Res, Session } from '@nestjs/common';

@Controller('/home')
export class HomeController {

  @Get('index')
  mostrarHome(@Res() res) {
    res.render('home/index');
  }

  @Get('principal')
  mostrarInicio(@Session() session, @Res() res) {
    if (session.username) {
      res.render('home/principal', {
        nombre: session.username.toUpperCase(),
      });
    } else {
      res.redirect('/home/index');
    }
  }

}
