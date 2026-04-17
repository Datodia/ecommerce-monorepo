import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { AdminGuard } from '@src/auth/guard/admin.guard';

@Controller('statistics')
@UseGuards(AuthGuard, AdminGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getAll() {
    return this.statisticsService.getAll();
  }
}
