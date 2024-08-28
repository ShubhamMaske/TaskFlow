import redis from '../config/redis.js';

const processTask = async (queueKey) => {
    const task = await redis.lpop(queueKey);

    if (!task) {
        console.log(`No tasks in ${queueKey}`);
        return;
    }

    console.log(`Processing task from ${queueKey}:`, JSON.parse(task));
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Task from ${queueKey} processed`);
};

const startWorker = () => {
    setInterval(async () => {
        const keys = await redis.keys('queue:*');

        for (const key of keys) {
            await processTask(key);
        }
    }, 5000);
};

startWorker();
