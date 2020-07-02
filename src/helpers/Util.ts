export class Util {
    /**
     * Returns the input function after waiting the specified amount of time
     * @param {Function} func The input function
     * @param {number} waitTime The amount of time in milliseconds to wait
     * 
     * @returns {Promise<T>} A promise containing the value of the input function
     */
    public static wait<T>(func: Function, waitTime: number): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(func() as unknown as T);
            }, waitTime)
        });
    }
}