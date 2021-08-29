import { PlexOauth } from "../src";

describe("Module", () => {
    let plexOauth = new PlexOauth({
        clientIdentifier: "dhjoasoidjapoiwdmamlw",
        device: "TEST DEVICE",
        product: "TEST DEVICE",
        version: "1",
        forwardUrl: "https://localhost/"
    });

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
});