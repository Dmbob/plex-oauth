/**
 * Represents the location of the user requesting the pin code
 */
interface IPlexCodeLocation {
    city: string,
    code: string,
    coordinates: string,
    country: string,
    postal_code: string,
    subdivisions: string,
    time_zone: string
}

/**
 * Represents the response from the Plex Pins API
 */
export interface IPlexCodeResponse {
    authToken: string | null,
    clientIdentifier: string,
    code: string,
    createdAt: string,
    expiresAt: string,
    expiresIn: number,
    id: number,
    location: IPlexCodeLocation,
    newRegistration:boolean | null,
    product: string,
    trusted: boolean
}

/**
 * Represents the headers needed when sending requests to the Plex Pins API
 */
export interface IPlexPinHeaders {
    "X-Plex-Client-Identifier": string,
    "X-Plex-Device": string,
    "X-Plex-Platform": string,
    "X-Plex-Product": string,
    "X-Plex-Version": string
}

/**
 * Represents info about your Plex application
 */
export interface IPlexClientDetails {
    /**
     * Unique Id that identifies your client
     */
    clientIdentifier: string,

    /**
     * Name of your application
     */
    product: string,

    /**
     * The type of device your application is running on
     */
    device: string,

    /**
     * Version of your application
     */
    version: string

    /**
     * Optional - Defaults to 'Web'
     */
    platform?: string,
}