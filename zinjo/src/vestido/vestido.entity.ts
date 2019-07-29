import {Entity, ManyToOne} from "typeorm";
import {PrimaryGeneratedColumn,Column} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";



@Entity('vestido')
export class VestidoEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    talla:string;
    @Column()
    color:string;
    @Column()
    precio:number;
    @Column()
    estado:string;
    @Column()
    descripcion:string;
    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.vestidos
    )
    usuario:UsuarioEntity;
}
