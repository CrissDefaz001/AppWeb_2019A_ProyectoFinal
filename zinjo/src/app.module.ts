import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import {VestidoEntity} from "./vestido/vestido.entity";
import {VestidoModule} from "./vestido/vestido.module";
import {VentasModule} from "./ventas/ventas.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'zinjo',
      entities: [UsuarioEntity,
      VestidoEntity],
      synchronize: true,
      dropSchema: false,
    }),
    HomeModule, UsuarioModule, VestidoModule,VentasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
