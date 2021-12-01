import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriceRequest, PriceResponses } from './dto';
import { PriceService } from './price.service';

@ApiTags('prices')
@Controller('prices')
export class PriceController {
    constructor(private priceService: PriceService) { }

    @Post('get-prices')
    @ApiOperation({ summary: 'Get Needed Prices' })
    private async getPrices(@Body() dto: PriceRequest): Promise<PriceResponses> {
        return this.priceService.getPrices(dto);
    }
}
