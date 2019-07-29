import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {VestidoEntity} from "../vestido/vestido.entity"


@Entity('usuario')
export class UsuarioEntity {

  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'nombreCompleto'
  })
  nombreCompleto: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'direccion'
  })
  direccion: string;

  @Column({
    type: 'varchar',
    length: 15,
    name: 'telefono'
  })
  telefono: string;

  @Column({
    type: 'date',
    default: '2001-01-01',
    name: 'fechaNac'
  })
  fechaNac: Date;

  @Column({
    type: 'varchar',
    length: 15,
    name: 'usuario'
  })
  usuario: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'passwordUno'
  })
  passwordUno: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'passwordDos'
  })
  passwordDos: string;

  @OneToMany(
      type => VestidoEntity,
      // @ts-ignore
      vestido => vestido.usuario
  )
  vestidos:VestidoEntity[];

}
