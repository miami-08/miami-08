import path from 'path';

import express, { RequestHandler } from 'express';
import 'babel-polyfill';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import routes from 'routes';

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

const app = express();

app.use('/api', routes);

// Отдаём статику приложения
app.use(express.static(path.resolve(__dirname, '../dist')));

// На все get запросы запускаем сначала middleware dev server, а потом middleware рендеринга приложения
app.get('/*', [...getWebpackMiddlewares()], serverRenderMiddleware);

export { app };
