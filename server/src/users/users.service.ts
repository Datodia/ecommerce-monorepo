import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ){}
  
  findAll({page,limit}: QueryParamsDto) {
    return this.userRepo.find({
      skip: (page - 1) * limit,
      take: limit
    });
  }

  findOne(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepo.delete({ id });
  }
}
