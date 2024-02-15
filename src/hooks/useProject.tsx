import { client } from "@/lib/client";
import { useParams } from "react-router-dom";
import { useUser } from "./useUser";
import { useQuery } from "@tanstack/react-query";

export const useProject = (projectId?: string | number) => {
    const { projectId: paramsProjectId } = useParams();
    const { user } = useUser();

    const _projectId = +(projectId || paramsProjectId || "");
    if (!_projectId) throw new Error("projectId is required");

    const { data: project } = useQuery({
        queryKey: ["projects", _projectId],
        queryFn: async () =>
            (
                await client.CoreGetProject({
                    projectId: _projectId,
                })
            ).project,
        enabled: !!_projectId,
    });
    const { data: members } = useQuery({
        queryKey: ["projects", _projectId, "members"],
        queryFn: async () =>
            (
                await client.CoreListProjectMember({
                    projectId: +(_projectId || ""),
                })
            ).members,
    });

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
