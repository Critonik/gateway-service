import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FakeAuthGuard } from '../auth/fake-auth/fake-auth.guard';
import { MenuGatewayService } from './menu-gateway.service';
import type { RequestWithUser } from '../common/types/request-with-user';

@UseGuards(FakeAuthGuard)
@Controller('menu')
export class MenuGatewayController {
  constructor(private readonly menuGatewayService: MenuGatewayService) {}

  @Get('dishes')
  async getAll(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.menuGatewayService.getAllDishes(userId);
  }
}
