import { IPlexClientDetails } from "../models/PlexCodeModels";
import { AuthPin } from "./AuthPin";
import { LinkHelper } from "../helpers/LinkHelper";
import { Validators } from "../helpers/Validators";

export class PlexOauth {
    private authPin: AuthPin;

    /**
     * Create an instance of the 'PlexOauth' class
     * @param {IPlexClientDetails} clientIdentifier Unique identifier for your client (Should be different for every client)
     */
    constructor (private clientInfo: IPlexClientDetails) {
        for (const validator of Validators.clientDetailsValidators) {
            validator(clientInfo);
        }

        this.authPin = new AuthPin();
    }

    /**
     * Request the hosted UI link for your app. A user will use this link to sign in and authenticate with Plex.
     * This gets returned with the pin id needed to query the Plex Pin API for the auth token
     * @returns {Promise<[string, number]} [hostedUIUrl, pinId] - Returns a promise of the hosted login URL and the pin Id as a tuple
     */
    public requestHostedLoginURL(): Promise<[string, number]> {
        return this.authPin.getPin(this.clientInfo).then(codeResponse => {
			let link = `${
				LinkHelper.PLEX_AUTH_BASE_PATH
			}#?code=${
				codeResponse.code
			}&context[device][product]=${
				this.clientInfo.product
			}&context[device][device]=${
				this.clientInfo.device
			}&clientID=${
				codeResponse.clientIdentifier
			}`;

			if (this.clientInfo.forwardUrl) {
				link += `&forwardUrl=${this.clientInfo.forwardUrl || ""}`;
			}

            return [
                link, 
                codeResponse.id
            ] as [string, number];
        }).catch(err => {
            throw err;
        });
    }

    /**
     * After a user signs in with the hosted UI, we need to check the Plex API for the auth token.
     * This function will poll their API looking for the auth token and returning it if found.
     * If the auth token is not found, this function will return null
     * @param {number} pinId The pinId to query for
     * @param {number} requestDelay The amount of delay in milliseconds. Can not go below 1000 (1 second)
     * @param {number} maxRetries The maximum number of retries until an auth token is received
     * 
     * @returns {Promise<string | null>} The authtoken if found or null
     */
    public checkForAuthToken(pinId: number, requestDelay?: number, maxRetries?: number): Promise<string | null> {
        if(!pinId) { throw new Error ("Pin Id is not set - Unable to poll for auth token without id"); }

        // If 'requestDelay' or 'maxRetries' is not set, then we will treat this
        // as a single request, so we only request the auth token from the api once
        requestDelay = requestDelay || 1000;
        maxRetries = maxRetries || 0;

        return this.authPin.pollForAuthToken(this.clientInfo, pinId, requestDelay, maxRetries).then(authToken => {
            return authToken;
        }).catch(err => {
            throw err;
        });
    }
}