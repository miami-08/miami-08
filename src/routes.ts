import * as express from 'express';
import { User } from 'initSequelize';

import { findTheme, updateUserThemeById } from 'models/UserTheme/controllers';
import { createUser, getAllUsers } from 'models/User/controllers';
import { createMsg, getMsgsByTopicId } from 'models/Message/controllers';
import { createTopic, getTopics } from 'models/Topic/controllers';

const router = express.Router();

router.post('/user-theme', (req, res) => {
    const { userid } = req.body;

    findTheme(userid.toString())
        .then((el) => res.json(el))
        .catch(() => {
            res.sendStatus(404).send('ошибка при создании темы');
        });
});

router.post('/add-user', async (req, res) => {
    const {
        first_name, second_name, login, email, phone, password, theme,
    } = req.body;

    createUser(first_name, second_name, login, email, phone, password, theme)
        .then((user) => {
            res.send(user);
        })
        .catch(() => {
            res.sendStatus(404).send('ошибка при создании юзера');
        });
});

router.post('/change-theme', async (req, res) => {
    const { theme, id } = req.body;
    const userTheme = await findTheme(id.toString());

    updateUserThemeById(userTheme!.id, { theme })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(() => {
            res.sendStatus(404).send('ошибка при изменении темы');
        });
});

router.get('/get-topics', (_, res) => {
    getTopics()
        .then((topics) => res.send(topics))
        .catch(() => {
            res.sendStatus(404).send('Темы не найдены');
        });
});

router.get('/messages/:id', (req, res) => {
    getMsgsByTopicId(parseInt(req.params?.id, 10))
        .then((messages) => {
            res.send(messages);
        })
        .catch(() => {
            res.sendStatus(404).send('Сообщение не найдено');
        });
});

router.post('/create-topic', (req, res) => {
    const { title = 'hello' } = req.body;
    createTopic(title)
        .then(() => getTopics())
        .then((topics) => res.send(topics))
        .catch(() => {
            res.sendStatus(404).send('Ошибка при создании темы');
        });
});

router.post('/create-message', (req, res) => {
    const { text = '', UserIdentifier = 0, TopicId = 0 } = req.body;
    createMsg(text, UserIdentifier, TopicId)
        .then(async () => {
            const messages = await getMsgsByTopicId(TopicId);
            const users: any[] = await getAllUsers();

            console.log('users :>> ', users);

            return messages.map((letter: any) => {
                const sender = users.find(
                    (user) => user.id === letter.UserIdentifier,
                );

                console.log(
                    'letter.UserIdentifier :>> ',
                    letter.UserIdentifier,
                );
                console.log('users[0].id :>> ', users[0].id);
                console.log('users[0].id :>> ', users[0]);

                if (sender) {
                    return { ...letter, sender };
                }

                return letter;
            });
        })
        .then((messages) => res.send(messages))
        .catch(() => {
            res.sendStatus(404).send('Ошибка при публикации сообщения');
        });
});

router.post('/login', (req, res) => {
    const { login, password } = req.body;

    User.findOne({ where: { login, password } })
        .then((user) => res.send(user))
        .catch(() => {
            res.sendStatus(404).send('Пользователь не найден');
        });
});

export default router;
