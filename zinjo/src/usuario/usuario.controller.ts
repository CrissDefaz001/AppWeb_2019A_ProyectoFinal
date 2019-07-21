import { Body, Controller, Get, Param, Post, Res, Session } from '@nestjs/common';
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
        select: ['idUsuario','usuario','passwordUno'],
        where: [{ 'usuario': usuario.username, 'passwordUno': usuario.passwordUno }],
      },
    ).then(
      value => {
        if (value[0].passwordUno === usuario.passwordUno &&
        value[0].usuario === usuario.username) {
          session.username = usuario.username;
          console.log(usuario);
          res.redirect('/home/principal');
        } else {
          res.status(400);
          res.send({
            mensaje: 'Usuario No registrado o credenciales incorrectas'
            , error: 400,
          });
        }
      },
    ).catch(
      reason => {
        console.log(reason);
        res.status(400);
        res.send({ mensaje: 'Usuario No registrado', error: 400 });
      },
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

  @Post('crearUsuario')
  async crearUsuarioPost(@Body() usuario: Usuario, @Res() res, @Session() session) {
    usuario.fechaNac = usuario.fechaNac ? new Date(usuario.fechaNac) : undefined;
    if (usuario.passwordUno === usuario.passwordDos) {
      const respuestaCrearUsuario = await this._usuarioService
        .crearUsuario(usuario); // Promesa
      console.log('RESPUESTA: ', respuestaCrearUsuario);
      // Crea la sesion
      session.username = respuestaCrearUsuario.usuario;
      res.redirect('/home/principal');
    } else {
      console.log('Las contraseñas no coinciden');
      res.status(400);
      res.send({ mensaje: 'Las contraseñas no coinciden', error: 400 });
    }
  }

  @Get('editarPass/:idUsuario')
  editarContrasenia(@Res() res, @Param('idUsuario') idUsuario: number, @Session() session) {
    this._usuarioService.buscar(
      {
        select: ['idUsuario','passwordUno'],
        where: [{ 'idUsuario': idUsuario }],
      },
    ).then(
      value => {
        value.forEach(
          i => {
            res.render('perfil/credenciales',
              { valor2: i, username2: session.username});
          },
        );
      },
    ).catch(
      reason => {
        console.log(reason);
        res.status(400);
        res.send({ mensaje: 'Error de consulta', error: 400 });
      },
    );

  }

  @Post('actualizarContrasenia/:idUsuario')
  editarContraseniaPost(@Res() res, @Body() usuario: Usuario,
                        @Param('idUsuario') idUsuario: number, @Session() session) {
    if (usuario.passwordUno === usuario.passwordDos) {
      this._usuarioService.actualizarContrasenia(idUsuario, usuario)
        .then(value => {
          console.log(value);
          console.log('Contraseña actualizada');
          // Actualizando contraseña de sesion
          this._usuarioService.buscar({
            select: ['passwordUno'],
            where: [{ 'idUsuario': idUsuario }],
          }).then(value1 => {
            console.log(value1.length);
            session.password = value1[0].passwordUno;
            res.redirect('/home/principal');
          });
        })
        .catch(reason => {
          console.log(reason);
          res.status(400);
          res.send({ mensaje: 'Error actualizando', error: 400 });
        });
    } else {
      console.log('Las contraseñas no coinciden');
      res.status(400);
      res.send({ mensaje: 'Las contraseñas no coinciden', error: 400 });
    }

  }

  @Get('editarUsuario/:username')
  editarUsuario(@Res() res, @Param('username') username: string, @Session() session) {
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
            res.render('perfil/perfil-usuario',
              { valor: i, username: session.username.toUpperCase() });
          },
        );
      },
    ).catch(
      reason => {
        console.log(reason);
        res.status(400);
        res.send({ mensaje: 'Error de consulta', error: 400 });
      },
    );
  }

  @Post('actualizarDatosUsuario/:idUsuario')
  editarUsuarioPost(@Res() res, @Body() usuario: Usuario,
                    @Param('idUsuario') idUsuario: number, @Session() session) {
    this._usuarioService.actualizarUsuario(idUsuario, usuario)
      .then(value => {
        console.log(value);
        console.log('Usuario actualizado');
        // Actualizando usuario de sesion
        this._usuarioService.buscar({
          select: ['usuario'],
          where: [{ 'idUsuario': idUsuario }],
        }).then(value1 => {
          session.username = value1[0].usuario;
          res.render('home/principal', {
            username: session.username.toUpperCase(),
          });
        });
      })
      .catch(reason => {
        console.log(reason);
        res.status(400);
        res.send({ mensaje: 'Error actualizando', error: 400 });
      });
  }

}
