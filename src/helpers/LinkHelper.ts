import { IPlexPinHeaders, IPlexClientDetails, IPlexCodeResponse } from "../models/PlexCodeModels";

/**
 * Contains a series of helper functions and values for getting and building the url's needed to 
 * request a Plex pin and token
 */
export class LinkHelper {
    public static readonly PLEX_PIN_BASE_PATH = "https://plex.tv/api/v2";
    public static readonly PLEX_AUTH_BASE_PATH = "https://app.plex.tv/auth";

    public static readonly PLEX_DEFAULT_PLATFORM = "Web";

    /**
     * Returns the headers needed to make requests to the Plex API using the client info
     * @param {IPlexClientDetails} clientInfo Client info to build headers from
     * 
     * @returns {IPlexPinHeaders} The headers needed to make the requests to the Plex API
     */
    public static getHeaders(clientInfo: IPlexClientDetails): IPlexPinHeaders {
        return {
            "X-Plex-Client-Identifier": clientInfo.clientIdentifier,
            "X-Plex-Device": clientInfo.device,
            "X-Plex-Platform": clientInfo.platform || this.PLEX_DEFAULT_PLATFORM,
            "X-Plex-Product": clientInfo.product,
            "X-Plex-Version": clientInfo.version
        }
    }
}