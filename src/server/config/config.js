import dotenv from "dotenv";
dotenv.config();

export default {
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        dataBaseName: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
    api: {
        user: process.env.API_USER,
        password: process.env.API_PASSWORD,
        token: process.env.API_TOKEN,
    },
    server: {
        port: process.env.PORT,
    },
    weatherParameters: {
        lang: process.env.WP_LANG,
        tz: process.env.WP_TZ,
        tempunit: process.env.WP_TEMPUNIT,
        windunit: process.env.WP_WINDUNIT,
        rounding: process.env.WP_ROUNDING,
        periodsNowcastLong: process.env.WP_PERIODS_NOWCAST_LONG,
        dataset: process.env.WP_DATASET,
    },
};
