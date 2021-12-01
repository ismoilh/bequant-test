import { Fsyms, Tsyms } from "../price.enums";
import {
    IsEnum
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class PriceRequest {
    @ApiProperty({ enum: Fsyms })
    @IsEnum(Fsyms)
    fsyms: Fsyms

    @ApiProperty({ enum: Tsyms })
    @IsEnum(Tsyms)
    tsyms: Tsyms
}