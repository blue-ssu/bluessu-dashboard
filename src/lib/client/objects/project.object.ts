export class ProjectObject {
    id: number;
    name: string;
    description: string;
    url?: string;
    roles: string[];
    iconURL: string;
    termsURL?: string;
    privacyURL?: string;
    redirectURLs: string[];

    clientId: string;
    clientSecret?: string;
    oAuthStatus: "Active" | "Inactive";
    createdAt: string;

    constructor(data: {
        id: number;
        name: string;
        description: string;
        url?: string;
        roles: string[];
        iconURL: string;
        termsURL?: string;
        privacyURL?: string;
        redirectURLs: string[];
        clientId: string;
        clientSecret?: string;
        oAuthStatus: "Active" | "Inactive";
        createdAt: string;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.url = data.url;
        this.roles = data.roles;
        this.iconURL = data.iconURL;
        this.termsURL = data.termsURL;
        this.privacyURL = data.privacyURL;
        this.clientId = data.clientId;
        this.clientSecret = data.clientSecret;
        this.redirectURLs = data.redirectURLs;
        this.oAuthStatus = data.oAuthStatus;
        this.createdAt = data.createdAt;
    }
}
