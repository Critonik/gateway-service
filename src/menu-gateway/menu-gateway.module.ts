import { Module } from '@nestjs/common';
import { MenuGatewayService } from './menu-gateway.service';
import { MenuGatewayController } from './menu-gateway.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MenuGatewayService],
  controllers: [MenuGatewayController],
})
export class MenuGatewayModule {}
