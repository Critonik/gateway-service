import { Module } from '@nestjs/common';
import { StoplistGatewayService } from './stoplist-gateway.service';
import { StoplistGatewayController } from './stoplist-gateway.controller';

@Module({
  providers: [StoplistGatewayService],
  controllers: [StoplistGatewayController]
})
export class StoplistGatewayModule {}
