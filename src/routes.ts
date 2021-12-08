import * as express from 'express';

import {
    createTheme,
    findTheme,
    updateUserThemeById,
} from 'models/UserTheme/controllers';
import { createUser, getAllUsers } from 'models/User/controllers';
import { createMsg, getMsgsByTopicId } from 'models/Message/controllers';
import { createTopic, getTopics } from 'models/Topic/controllers';

const router = express.Router();

router.post('/user-theme', (req, res) => {
    const { userid } = req.body;

    findTheme(userid.toString())
        .then((el) => res.json(el))
        .catch(() => res.sendStatus(400));
});

router.post('/add-user', async (req, res) => {
    const { first_name, second_name, login, email, phone, identifier } =
        req.body;

    await createUser(first_name, second_name, login, email, phone, identifier);
    await createTheme('light', identifier);

    await res.sendStatus(200);
});

router.post('/change-theme', async (req, res) => {
    const { theme, id } = req.body;
    const userTheme = await findTheme(id.toString());
    updateUserThemeById(userTheme!.id, { theme });
    res.sendStatus(200);
});
router.get('/get-topics', async (_, res) => {
    const topics = await getTopics();
    const users = await getAllUsers();
    const topicsWithMessages = await Promise.all(
        topics.map(async (topic: any) => {
            const messages = await getMsgsByTopicId(topic.id);
            const newMessages = messages.map((mes: any) => {
                const currentUser: any = users.filter(
                    // @eslint-ignore
                    (user: any) => user.identifier === mes.UserIdentifier,
                )[0];
                return { ...mes.dataValues, ...currentUser.dataValues };
            });
            return { id: topic.id, title: topic.title, messages: newMessages };
        }),
    );
    res.json(topicsWithMessages);
});

router.post('/create-topic', (req, res) => {
    const { title = 'hello' } = req.body;
    createTopic(title);
    res.sendStatus(200);
});

router.post('/create-message', async (req, res) => {
    const { text = '', UserIdentifier = 0, TopicId = 0 } = req.body;
    createMsg(text, UserIdentifier, TopicId);
    res.sendStatus(200);
});

export default router;
