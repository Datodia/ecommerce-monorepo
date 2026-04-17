import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { AdminGuard } from '@src/auth/guard/admin.guard';
import { Admin } from '@src/auth/decorators/admin.decorator';

@Controller('users')
@UseGuards(AuthGuard, AdminGuard)
@Admin()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() { limit, page }: QueryParamsDto) {
    return this.usersService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
