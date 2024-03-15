import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'Username', type: 'varchar' })
  username: string;

  @Column({ name: 'Email', type: 'varchar' })
  email: string;

  @Column({ name: 'Password', type: 'varchar' })
  password: string;

  @Column({ name: 'IsActive', type: 'boolean' })
  isActive: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
