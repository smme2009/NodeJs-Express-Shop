import { createClient, RedisClientType } from "redis";

// Redis工具
export default class Redis {
    // Redis套件
    private redis: RedisClientType;

    /**
     * 建構子
     */
    constructor() {
        const host: string = process.env.REDIS_HOST;
        const port: string = process.env.REDIS_PORT;
        const url: string = `redis://${host}:${port}`;

        // 連線
        const redis: RedisClientType = createClient({ url: url });
        redis.connect();

        this.redis = redis;
    }

    /**
     * 設定
     *
     * @param {string} key 鍵
     * @param {string | number} value 值
     * @param {number} limitTime 限制時間
     *
     * @returns {Promise<boolean>} 是否設定成功
     */
    public async set(
        key: string,
        value: string | number,
        limitTime?: number
    ): Promise<boolean> {
        let result: null | string = null;

        if (limitTime === undefined) {
            result = await this.redis.set(key, value);
        } else {
            result = await this.redis.set(key, value, {
                EX: limitTime,
            });
        }

        // 成功設定時Redis會回傳OK這個字
        const isSet: boolean = result === "OK" ? true : false;

        return isSet;
    }

    /**
     * 是否有鍵
     *
     * @param {string} key 鍵
     *
     * @returns {Promise<boolean>} 是否有鍵
     */
    public async hasKey(key: string): Promise<boolean> {
        const total: number = await this.redis.exists(key);
        const hasKey: boolean = total === 1 ? true : false;

        return hasKey;
    }

    /**
     * 刪除
     *
     * @param {string} key 鍵
     *
     * @returns {Promise<boolean>} 是否刪除
     */
    public async delete(key: string): Promise<boolean> {
        const total: number = await this.redis.del(key);
        const isDelete: boolean = total === 1 ? true : false;

        return isDelete;
    }
}
