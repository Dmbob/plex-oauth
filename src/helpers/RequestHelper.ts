import axios, { AxiosRequestConfig } from "axios";

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
    public static get(url: string, headers: AxiosRequestConfig["headers"]): Promise<any> {
       return axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...headers
            }
        }).then(response => {
            return response.data;
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
    public static post(url: string, body: string, headers: AxiosRequestConfig["headers"]): Promise<any> {
        return axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...headers
            }
        }).then(response => {
            return response.data;
        });
    }
}