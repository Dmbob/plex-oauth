import { IPlexCodeResponse, IPlexClientDetails } from "../models/PlexCodeModels";
import { RequestHelper } from "../helpers/RequestHelper";
import { LinkHelper } from "../helpers/LinkHelper";
import { Util } from "../helpers/Util";

export class AuthPin {
    constructor() {}

    /**
     * Request's an OAuth Pin from the Plex API, which is used to get the Auth Token
     * @param {IPlexClientDetails} clientInfo Client information to send to the Plex API
     * 
     * @returns {Promise<IPlexCodeResponse>} The hosted ui URL
     */
    public getPin(clientInfo: IPlexClientDetails): Promise<IPlexCodeResponse> {
        return RequestHelper.post(`${LinkHelper.PLEX_PIN_BASE_PATH}/pins?strong=true`, "", {...LinkHelper.getHeaders(clientInfo)}).then(response => {
            return response as IPlexCodeResponse;
        }).catch(err => {
            throw err;
        });
    }

    /**
     * Sends repeated requests to the Plex Pin API with the provided pin id. It will then return
     * the auth token if it gets one, or null if it runs out of retries.
     * @param {IPlexClientDetails} clientInfo Client information to send to the Plex API
     * @param {number} pinId The id of the Plex pin to query for
     * @param {number} requestDelay The delay in seconds to wait between each poll
     * @param {number} maxRetries The number of retries before returning null
     * 
     * @returns {Promise<string | null>} The auth token if found or null
     */
    public pollForAuthToken(clientInfo: IPlexClientDetails, pinId: number, requestDelay: number, maxRetries: number): Promise<string | null> {
        if(requestDelay < 1000) {
            requestDelay = 1000;
        }

        return RequestHelper.get(`${LinkHelper.PLEX_PIN_BASE_PATH}/pins/${pinId}`, {...LinkHelper.getHeaders(clientInfo)}).then(response => {
            if(response) {
                let pinData = response as IPlexCodeResponse;

                if(pinData.authToken) {
                    return pinData.authToken;
                }else {
                    if(maxRetries <= 0) { return null }
                    return Util.wait<string | null>(() => this.pollForAuthToken(clientInfo, pinId, requestDelay, maxRetries-=1), requestDelay);
                }
            }else {
                return null;
            }
        }).catch(err => {
            throw err;
        });
    }
}