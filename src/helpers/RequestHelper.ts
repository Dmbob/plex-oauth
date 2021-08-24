import https from "https";
import { OutgoingHttpHeaders } from "http";

/**
 * Class to facilitate the different web requests needed to query the Plex OAuth API
 */
export class RequestHelper {    
    /**
     * Make a GET request to the specified endpoint
     * @param {string} url Request URL
     * @param {OutgoingHttpHeaders} headers Additional headers to be passed to the request
     * 
     * @returns {Promise<any>} A promise containing the result of the GET request
     */
    public static get(url: string, headers: OutgoingHttpHeaders): Promise<any> {
        let params: https.RequestOptions = {
            hostname: url,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...headers
            }
        }

        return new Promise((resolve, reject) => {
            let req = https.request(params, (response) => {
                let responseStr = "";

                response.on("data", (data) => {
                    responseStr += data;
                });

                response.on("end", () => {
                    let jsonData = JSON.parse(responseStr);

                    if(jsonData) {
                        resolve(jsonData);
                    }else {
                        reject(new Error("Unable to parse response into JSON"));
                    }
                });
            });

            req.on("error", (err) => {
                reject(err);
            });

            req.end();
        });
    }

    /**
     * Make a POST request to the specified endpoint
     * @param {string} url Request URL
     * @param {string} body Body as a JSON String
     * @param {OutgoingHttpHeaders} headers Additional headers to be passed to the request
     * 
     * @returns {Promise<any>} A promise containing the result of the POST request
     */
    public static post(url: string, body: string, headers: OutgoingHttpHeaders): Promise<any> {
        let params: https.RequestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": body.length,
                "Accept": "application/json",
                ...headers
            }
        }

        return new Promise((resolve, reject) => {
            let req = https.request(url, params, (response) => {
                let responseStr = "";

                response.on("data", (data) => {
                    responseStr += data;
                });

                response.on("end", () => {
                    let jsonData = JSON.parse(responseStr);
                    if(jsonData) {
                        resolve(jsonData);
                    }else {
                        reject(new Error("Unable to parse response into JSON"));
                    }
                });
            });

            req.on("error", (err) => {
                reject(err);
            })

            req.write(body);
            req.end();
        });
    }
}