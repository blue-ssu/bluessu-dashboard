export class ProjectObject {
    id: number;
    name: string;
    description: string;
    url?: string;
    roles: string[];
    iconURL: string;
    termsURL?: string;
    privacyURL?: string;
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
        this.createdAt = data.createdAt;
    }
}
