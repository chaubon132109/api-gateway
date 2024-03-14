import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Query,
    Inject,
}from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/role.gaurd';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { log } from 'console';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
    ) {}

    @MessagePattern({cmd:'getAllUsers'})
    findAllQuery(data:any): Promise<User[]> {
        const {sortBy,sortOrder, limit} = data;
        return this.usersService.findAll(sortBy,sortOrder, limit);
    }
    
    @MessagePattern({cmd:'findOne'})
    findOne(id:number): Promise<User> {
      return this.usersService.findOne(id);
    }
    
    @MessagePattern({cmd:'create'})
    async create(user :User): Promise<User> {
      return await this.usersService.create(user);
    }
    @MessagePattern({cmd:'update'})
    update(data : any): Promise<User> {
      const {user, id} = data;
      return this.usersService.update(id, user);
    }
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.usersService.remove(id);
    }
}