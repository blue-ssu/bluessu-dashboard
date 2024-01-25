import { client } from "@/lib/client";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useUser } from "./useUser";

export const useProject = (projectId?: string | number) => {
    const { projectId: paramsProjectId } = useParams();
    const { user } = useUser();

    const _projectId = +(projectId || paramsProjectId || "");
    if (!_projectId) throw new Error("projectId is required");

    const { data: project } = useQuery(
        ["projects", _projectId],
        async () =>
            (await client.CoreGetProject({ projectId: +(_projectId || "") }))
                .project
    );
    const { data: members } = useQuery(
        ["projects", _projectId, "members"],
        async () =>
            (
                await client.CoreListProjectMember({
                    projectId: +(_projectId || ""),
                })
            ).members
    );

    const member = members?.find((member) => member.user.id === user?.id);
    const isOwner = member?.role === "Owner";

    return {
        projectId: _projectId,
        project,
        members,
        member,
        isOwner,
    };
};
