import { Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { configuration } from '../configuration';
import { ApiModulesList } from 'src/api/api.modules.list';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({ ...config.get('database') } as TypeOrmModuleOptions),
        }),
        ...ApiModulesList,
    ],
})
export class AppModule {
}
