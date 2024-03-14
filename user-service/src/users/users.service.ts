import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(sortBy : string, sortOrder: string, limit : number): Promise<User[]> {
    const order = sortOrder||'asc';
    const by = sortBy||'id';
    const limitConst = limit || 10;
    const users = this.usersRepository.find({
      take : limit,
      order: { [by]: order },
    });
    return users;
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }
  findOneByUsername(username : string): Promise<User> { 
    return this.usersRepository.findOneBy({username});
  }
  async create(user: User): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await this.usersRepository.save(user);
    return user;
  }
  async update(id: number, user: User): Promise<User> {
    const updatedUser = await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({id});
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}