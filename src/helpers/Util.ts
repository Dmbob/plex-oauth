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

    /**
     * Converts input URL string into a 'URL' object and passes it to the specified validator function
     * @param {string} url The URL to validate
     * @param {(url: URL) => boolean} validator The validation logic to apply to the URL
     * @returns {boolean} True if the validation passes or false if it does not
     */
    public static validateUrl(url: string, validator: (url: URL) => boolean) {
        const u = new URL(url);
        return validator(u);
    }
}