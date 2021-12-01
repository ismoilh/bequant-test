import { ApiProperty } from "@nestjs/swagger";
import { Price } from ".";

export class PriceResponses {
    @ApiProperty({ type: () => [Price] })
    list: Price[]
}