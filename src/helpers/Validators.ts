import { IPlexClientDetails } from "../models/PlexCodeModels";
import { Util } from "./Util";

/**
 * This namespace contains validators used for various purposes
 */
export namespace Validators {
    /**
     * Validators specific to validating the Plex Client Details
     */
    export const clientDetailsValidators: Array<(clientInfo: IPlexClientDetails) => void> = [
        /**
         * Validate that the forward URL only uses http/https protocols
         */
        (clientInfo) => {
            if (!Util.validateUrl(clientInfo.forwardUrl, forwardUrl => {
                const regex = new RegExp(/http[s]?/);
                return regex.test(forwardUrl.protocol);
            })) {
                console.warn("Validation: The forwardUrl must have a protocol of http/https");
            }
        }
    ];
}