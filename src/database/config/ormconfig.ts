export function ormConfig(): any {
    return {
        url: process.env.DATABASE_URL,
        type: process.env.DATABASE_TYPE,
        database: process.env.DATABASE_NAME,
        connectTimeout: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
        acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT),
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        extra: {
            connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT),
        },
        entities: [
            'dist/**/entity/*.entity.js',
        ],
        migrations: [
            'dist/database/migrations/*.js',
        ],
        subscribers: [
            'dist/observers/subscribers/*.subscriber.js',
        ],
        cli: {
            entitiesDir: 'src/components/**/entity',
            migrationsDir: 'src/database/migrations',
            subscribersDir: 'src/observers/subscribers',
        },
    };
}