import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationService } from '@src/notification/notification.service';

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject('RABBIT_SERVICE') private client: ClientProxy,
    ) {}

    emit(pattern: string, data: any) {
        this.client.emit(pattern, data);
    }
}
