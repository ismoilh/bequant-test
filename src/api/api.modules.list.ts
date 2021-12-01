import { Type } from '@nestjs/common';
import { PriceModule } from './price/price.module';

export const ApiModulesList: Array<Type<any>> = [
    PriceModule
];
