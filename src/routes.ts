import * as express from 'express';

import { createTopic, getTopics } from 'models/Topic/controllers';
import { createMsg, getMsgsByTopicId } from 'models/Message/controllers';

const router = express.Router();

router.get('/get-topics', (_, res) => {
    getTopics()
        .then((data) => {
            const messages = getMsgsByTopicId(data.id);
            return { data, messages };
        })
        .then((data) => res.json(data))
        .catch(() => {
            res.status(404).send('an error occurred during getting topics');
        });
});

router.post('/create-topic', (req, res) => {
    const { title = 'hello' } = req.body;

    createTopic(title)
        .then(() => {
            res.send('topic created');
        })
        .catch(() => {
            res.status(404).send('an error occurred during creating topic');
        });
});

router.post('/create-message', (req, res) => {
    const { text = '', UserId = 0, TopicId = 0 } = req.body;

    createMsg(text, UserId, TopicId)
        .then(() => {
            res.send(TopicId);
        })
        .catch(() => {
            res.status(404).send('an error occurred during creating message');
        });
});

export default router;
