import * as express from 'express';

import { createTopic, getTopics } from 'models/Topic/controllers';
import { createMsg, getMsgsByTopicId } from 'models/Message/controllers';
import { createUser, getAllUsers, getUserById } from 'models/User/controllers';

const router = express.Router();

router.get('/users', (req, res) => {
    try {
        const { id } = req.body;

        if (id || id === 0) {
            getUserById(id).then((data) => {
                res.send(data);
            });
        } else {
            getAllUsers().then((data) => {
                if (data.length === 0) {
                    res.send('no users found');
                } else {
                    res.send(data);
                }
            });
        }
    } catch (e) {
        res.send('an error occurred during getting users');
    }
});

router.post('/users', (req, res) => {
    const { firstName = 'John', lastName = 'Doe' } = req.body;

    createUser(firstName, lastName)
        .then(() => {
            res.send('OK');
        })
        .catch(() => {
            res.status(404).send('an error occurred during creating user');
        });
});

router.get('/topics', (_, res) => {
    getTopics()
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.status(404).send('an error occurred during getting topics');
        });
});

router.post('/topics', (req, res) => {
    const { title = '' } = req.body;

    createTopic(title)
        .then(() => {
            res.send('topic created');
        })
        .catch(() => {
            res.status(404).send('an error occurred during creating topic');
        });
});

router.get('/messages', (req, res) => {
    try {
        const { TopicId = 1 } = req.body;

        getMsgsByTopicId(TopicId).then((data) => {
            if (data.length === 0) {
                res.send('no messages');
            } else {
                res.send(data);
            }
        });
    } catch (e) {
        res.status(404).send(
            'an error occurred during getting messages by topic id',
        );
    }
});

router.post('/messages', (req, res) => {
    const { text = '', UserId = 0, TopicId = 0 } = req.body;

    createMsg(text, UserId, TopicId)
        .then(() => {
            res.send('OK');
        })
        .catch(() => {
            res.status(404).send('an error occurred during creating message');
        });
});

export default router;
