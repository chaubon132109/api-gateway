import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/role.gaurd';
import { Roles } from 'src/auth/roles.decorator';
import { createUserDTO } from '../dto/createUser.dto';
import { log } from 'console';
import { updateUserDTO } from 'src/dto/updateUser.dto';
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor (    
        @Inject('USER_SERVICE') private readonly userClient : ClientProxy,
    ){}
    @Get()
    getAllUsers(@Query('sortBy') sortBy: string,@Query('sortOrder') sortOrder: string, @Query('limit') limit: number) {
        return this.userClient.send({cmd:'getAllUsers'},{sortBy:sortBy,sortOrder: sortOrder , limit : limit});
    }
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.userClient.send({cmd:'findOne'},id);
    }
    @Post()
    async create(@Body() createUserDTO: createUserDTO): Promise<any> {
      return await this.userClient.send({cmd:'create'},createUserDTO);
    }
    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() user: updateUserDTO) : Promise<any> {
        return await this.userClient.send({cmd:'update'},{user:user, id:id});
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: number){
        return await this.userClient.send({cmd:'delete'},id);
    }
}
