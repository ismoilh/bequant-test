import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { agent } from 'supertest';
import { AppModule } from '../src/app/app.module';
import { Fsyms, Tsyms } from '../src/api/price/price.enums';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    const headers = { 'Content-Type': 'application/json' };

    const post = (endPoint: string) => agent(app.getHttpServer()).post(`${endPoint}`).set(headers);

    const randomEnumValue = (enumeration) => {
        const values = Object.keys(enumeration);
        const enumKey = values[Math.floor(Math.random() * values.length)];
        return enumeration[enumKey];
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('PRICE: Get Prices (POST)', async () => {
        const { status, body } = await post('/prices/get-prices').send({ fsyms: randomEnumValue(Fsyms), tsyms: randomEnumValue(Tsyms) });
        expect(status).toEqual(201)
        expect(body).toHaveProperty('list')
    });
});