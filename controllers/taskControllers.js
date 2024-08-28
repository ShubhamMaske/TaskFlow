
import redis from "../config/redis.js";

export const enqueueTask = async (req, res) => {
    const { task } = req.body;

    try {
        const queueKey = `queue:${req.user.userId}`;
        await redis.rpush(queueKey, JSON.stringify(task));
        res.status(200).json({ message: 'Task added to queue', queueKey: queueKey});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const dequeueTask = async (req, res) => {
    try {
        const queueKey = `queue:${req.user.userId}`;
        const task = await redis.lpop(queueKey);

        if (!task) {
            return res.status(404).json({ message: 'No tasks in queue' });
        }

        res.status(200).json({ task: JSON.parse(task) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}