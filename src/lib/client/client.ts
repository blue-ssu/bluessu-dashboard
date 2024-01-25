import { EndpointClient } from "endpoint-client";
import {
    CoreAddMemberToProject,
    CoreCreateProject,
    CoreDeleteProject,
    CoreGenerateProjectClientSecret,
    CoreGetProject,
    CoreGetUser,
    CoreListProject,
    CoreListProjectMember,
    CoreListUserMember,
    CoreRemoveMemberFromProject,
    CoreUpdateMemberRole,
    CoreUpdateProject,
} from "./endpoints";

export class Client extends EndpointClient {
    readonly CoreGetUser = this.endpointBuilder(CoreGetUser);
    readonly CoreListUserMember = this.endpointBuilder(CoreListUserMember);

    // Project
    readonly CoreCreateProject = this.endpointBuilder(CoreCreateProject);
    readonly CoreListProject = this.endpointBuilder(CoreListProject);
    readonly CoreGetProject = this.endpointBuilder(CoreGetProject);
    readonly CoreUpdateProject = this.endpointBuilder(CoreUpdateProject);
    readonly CoreDeleteProject = this.endpointBuilder(CoreDeleteProject);

    readonly CoreGenerateProjectClientSecret = this.endpointBuilder(
        CoreGenerateProjectClientSecret
    );

    // ProjectMember
    readonly CoreListProjectMember = this.endpointBuilder(
        CoreListProjectMember
    );
    readonly CoreAddMemberToProject = this.endpointBuilder(
        CoreAddMemberToProject
    );
    readonly CoreRemoveMemberFromProject = this.endpointBuilder(
        CoreRemoveMemberFromProject
    );
    readonly CoreUpdateMemberRole = this.endpointBuilder(CoreUpdateMemberRole);
}

export const client = new Client({
    baseUrl: import.meta.env.VITE_BLUESSU_CORE_URL,
    auth: localStorage.getItem("token") || "",
});
