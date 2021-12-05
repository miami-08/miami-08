import * as express from 'express';

import { dispatchOrmUserActions } from 'models/User/controllers';

const router = express.Router();

router.get('/orm-actions', (_, res) => {
    // это пример использования модельки. потом можно впихивать это в какие угодно файлы
    // удалю после апрува пр, когда скажете, что всё ок и всем всё понятно :>
    // и да, я помню, что мы договаривались в качестве примера ничего не писать
    // но тут, мне показалось, что надо

    // это пример использования модельки. потом можно впихивать это в какие угодно файлы
    // удалю после апрува пр, когда скажете, что всё ок и всем всё понятно :>
    // и да, я помню, что мы договаривались в качестве примера ничего не писать
    // но тут, мне показалось, что надо

    dispatchOrmUserActions();

    res.send("orm-actions' response");
});

router.get('/topics', (_, res) => {
    res.send('topics');
});

export default router;
