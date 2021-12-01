const {
    HOST: host,
    NODE_ENV: environment = 'development',
    HTTP_PORT: port = '3000',
    DB_HOST: dbHost = 'localhost',
    DB_PORT: dbPort = '5432',
    DB_PASSWORD: dbPassword = 'example',
    DB_USER: dbUser = 'postgres',
    FSYMS: fsyms = 'BTC,ETH',
    TSYMS: tsyms = 'USD,EUR',
} = process.env;

export const configuration = () => ({
    environment,
    server: {
        host,
        port,
    },
    database: {
        type: 'postgres',
        database: 'postgres',
        dropSchema: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        host: dbHost,
        logging: false,
        password: dbPassword,
        port: dbPort,
        username: dbUser,
        synchronize: true,
    },
    priceModule: {
        fsyms,
        tsyms,
    },
});
