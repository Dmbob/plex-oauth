import { PlexOauth } from "../src";

describe("Module", () => {
    let plexOauth = new PlexOauth({
        clientIdentifier: "dhjoasoidjapoiwdmamlw",
        device: "TEST DEVICE",
        product: "TEST DEVICE",
        version: "1",
        forwardUrl: "https://localhost/"
    });

    beforeEach(() => {
        spyOn(console, "warn");
    })

    it("loads and initializes", () => {
        expect(plexOauth).toBeDefined();
    });

    it("returns a hosted ui link and poll for an auth token", () => {
        plexOauth.requestHostedLoginURL().then(response => {
            let [hostedUiLink, pinId] = response;

            expect(hostedUiLink).toBeDefined();
            expect(hostedUiLink).toContain("https://app.plex.tv/auth");
            expect(hostedUiLink).not.toContain("undefined");
            expect(hostedUiLink).not.toContain("null");

            plexOauth.checkForAuthToken(pinId, 1000, 1).then(pinResponse => {
                let authToken = pinResponse;

                expect(authToken).toBeNull();
            });
        });
    });

    it("logs a warning if the forwardUrl does not use http/https protocol", () => {
        const testError = new PlexOauth({
            clientIdentifier: "dhjoasoidjapoiwdmamlw",
            device: "TEST DEVICE",
            product: "TEST DEVICE",
            version: "1",
            forwardUrl: "notreal://localhost/"
        });

        expect(console.warn).toHaveBeenCalledWith("Validation: The forwardUrl must have a protocol of http/https");
    });

    it("returns a URL with no forwardUrl if the input forwardUrl is not specified", async () => {
        const details = await new PlexOauth({
            clientIdentifier: "dhjoasoidjapoiwdmamlw",
            device: "TEST DEVICE",
            product: "TEST DEVICE",
            version: "1"
        }).requestHostedLoginURL();
        
        const url = new URL(details[0]);
        expect(url.hash).not.toMatch(/\&forwardUrl=(.*)/)
    });

    it("returns a URL with forwardUrl if the input forwardUrl is specified", async () => {
        const details = await new PlexOauth({
            clientIdentifier: "dhjoasoidjapoiwdmamlw",
            device: "TEST DEVICE",
            product: "TEST DEVICE",
            version: "1",
            forwardUrl: "http://example.com"
        }).requestHostedLoginURL();
        
        const url = new URL(details[0]);
        expect(url.hash).toMatch(/\&forwardUrl=http:\/\/example.com/)
    });
});