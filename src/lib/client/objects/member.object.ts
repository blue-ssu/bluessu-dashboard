import { ProjectObject } from "./project.object";
import { UserObject } from "./user.object";

export class MemberObject {
    id: number;
    name: string;
    profileImage: string;
    role: "Member" | "Owner";
    createdAt: string;
    user: UserObject;
    project?: ProjectObject;

    constructor(data: {
        id: number;
        name: string;
        profileImage: string;
        role: string;
        createdAt: string;
        user: UserObject;
        project?: ProjectObject;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.profileImage = data.profileImage;
        this.role = data.role as "Member" | "Owner";
        this.createdAt = data.createdAt;
        this.user = data.user;
        this.project = data.project;
    }
}
