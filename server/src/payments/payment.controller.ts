import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { User } from '@src/users/decorators/user.decorator';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout')
  @UseGuards(AuthGuard)
  createCheckout(
    @User() user: { userId: string },
    @Body() createCheckoutDto: CreateCheckoutDto,
  ) {
    return this.paymentService.createCheckoutSession(
      user.userId,
      createCheckoutDto,
    );
  }

  @Post('webhook')
  webhook(
    @Req() request: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.paymentService.handleWebhook(request.body as Buffer, signature);
  }
}
