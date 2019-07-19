import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Controller('/usuario')
export class UsuarioController {

  constructor(private readonly _usuarioService: UsuarioService) {
  }

  @Post('login')
  login(@Body() usuario, @Session() session, @Res() res) {
    this._usuarioService.buscar(
      {
        select: ["idUsuario"],
        where: [{ "usuario": usuario.username }]
      }
    ).then(
      value => {
        if(value.length > 0){
          console.log(value);
          session.username = usuario.username;
          console.log(usuario);
          res.redirect('/home/principal');
        }else{
          res.status(400);
          res.send({ mensaje: 'Usuario No registrado', error: 400 });
        }
      }
    ).catch(
      reason => {
        console.log(reason);
        res.status(400);
        res.send({ mensaje: 'Usuario No registrado', error: 400 });
      }
    );
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
    res.render('registro/registro');
  }

  @Get('perfil')
  mostrarPerfil(@Session() session, @Res() res) {
    if (session.username) {
      res.render('perfil/perfil-usuario', {
        nombre: session.username.toUpperCase(),
      });
    } else {
      res.redirect('/home/principal');
    }
  }

  @Post('crearUsuario')
  async crearUsuarioPost(@Body() usuario: Usuario, @Res() res, @Session() session){
    usuario.fechaNac = usuario.fechaNac? new Date(usuario.fechaNac): undefined;
    if(usuario.passwordUno.toString() === usuario.passwordDos.toString()){
      const respuestaCrearUsuario = await this._usuarioService
        .crearUsuario(usuario); // Promesa
      console.log('RESPUESTA: ', respuestaCrearUsuario);
      // Crea la sesion
      session.username = respuestaCrearUsuario.usuario;
      res.redirect('/home/principal');
    }else{
      //alert("Las contraseñas no coinciden");
      // let x = <HTMLInputElement> window.document.getElementById('password2');
      // x.setCustomValidity("Las contraseñas no coinciden")
      console.log("Las contraseñas no coinciden")
    }
  }

}
