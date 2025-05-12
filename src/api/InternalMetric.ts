import {
    AnalyticsEvent,
    ConfigApi,
    IdentityApi
} from "@backstage/core-plugin-api";

type AnalyticsApi = {
    captureEvent: (event: AnalyticsEvent) => void;
};

type Options = {
    configApi: ConfigApi;
    identityApi: IdentityApi;
};

export class InternalMetricApi implements AnalyticsApi {
    private readonly configApi: ConfigApi;
    private readonly identityApi: IdentityApi;

    constructor(options: Options) {
        this.configApi = options.configApi;
        this.identityApi = options.identityApi;
    }

    static fromConfig(
        config: ConfigApi,
        identityApi: IdentityApi,
    ) {
        return new InternalMetricApi({
            configApi: config,
            identityApi,
        });
    }

    async captureEvent(event: AnalyticsEvent) {
        const { token } = await this.identityApi.getCredentials();
        const { userEntityRef } = await this.identityApi.getBackstageIdentity();

        const baseUrl = this.configApi.getString("backend.baseUrl");

        const request = {
            user: userEntityRef,
            ...event
        };

        await fetch(`${baseUrl}/api/analytics/event`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        })
    }
}