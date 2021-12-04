import path from 'path';

import express, { RequestHandler } from 'express';
import 'babel-polyfill';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import routes from 'routes';
import { dbConnect } from 'initSequelize';

import config from '../webpack/client.config';

import serverRenderMiddleware from './server-render-middleware';

function getWebpackMiddlewares(): RequestHandler[] {
    const compiler = webpack({ ...config, mode: 'development' });

    return [
        devMiddleware(compiler, {
            // publicPath объединенного типа и в этом проблема -
            // нельзя привести string к func
            // @ts-ignore
            publicPath: config.output!.publicPath!,
        }),
        hotMiddleware(compiler, { path: '/__webpack_hmr' }),
    ];
}

// подключение к БД необходимо для работы sequelize
// eslint-disable-next-line func-names
(async function () {
    await dbConnect();
}());

const app = express();

app.use(express.json())
    .use('/api', routes)
    .use(express.static(path.resolve(__dirname, '../dist')))
    .get('/*', [...getWebpackMiddlewares()], serverRenderMiddleware);

export { app };
