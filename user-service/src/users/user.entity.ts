import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, AfterLoad, AfterInsert, AfterUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  @IsNotEmpty({message:'Username must not be empty'})
  username: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty({message:'Password must not be empty'})
  @MinLength(8,{message: 'Password must be at least 8 characters'})
  password: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty({message:'Email must not be empty'})
  @IsEmail({}, {message: 'Email is not valid'})
  email: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
  @ApiProperty()
  @Column({ default: 'user' })
  Role: string;
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}