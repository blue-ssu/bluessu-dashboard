import { Endpoint } from "endpoint-client";
import { ProjectObject } from "..";

/**
 * POST /projects
 * 새로운 프로젝트를 생성합니다.
 */
export const CoreCreateProject: Endpoint<
    CoreCreateProjectParameters,
    CoreCreateProjectResponse
> = {
    path: "/projects",
    method: "POST",
    bodyParams: [
        "name",
        "description",
        "url",
        "iconURL",
        "termsURL",
        "privacyURL",
    ],
};
export type CoreCreateProjectParameters = {
    name: string;
    description: string;
    url?: string;
    iconURL?: string;
    termsURL?: string;
    privacyURL?: string;
};
export type CoreCreateProjectResponse = {
    project: ProjectObject;
};

/**
 * GET /projects
 * 프로젝트 리스트를 가져옵니다.
 */
export const CoreListProject: Endpoint<
    CoreListProjectParameters,
    CoreListProjectResponse
> = {
    path: "/projects",
    method: "GET",
};
export type CoreListProjectParameters = Record<string, never>;
export type CoreListProjectResponse = {
    projects: ProjectObject[];
};

/**
 * GET /projects/:projectId
 * 프로젝트 정보를 가져옵니다.
 */
export const CoreGetProject: Endpoint<
    CoreGetProjectParameters,
    CoreGetProjectResponse
> = {
    path: (e) => `/projects/${e.projectId}`,
    method: "GET",
    pathParams: ["projectId"],
};
export type CoreGetProjectPathParameters = {
    projectId: number;
};
export type CoreGetProjectParameters = CoreGetProjectPathParameters;
export type CoreGetProjectResponse = {
    project: ProjectObject;
};

/**
 * PATCH /projects/:projectId
 * 프로젝트 정보를 수정합니다.
 */
export const CoreUpdateProject: Endpoint<
    CoreUpdateProjectParameters,
    CoreUpdateProjectResponse
> = {
    path: (e) => `/projects/${e.projectId}`,
    method: "PATCH",
    pathParams: ["projectId"],
    bodyParams: [
        "name",
        "description",
        "url",
        "iconURL",
        "termsURL",
        "privacyURL",
    ],
};
export type CoreUpdateProjectPathParameters = {
    projectId: number;
};
export type CoreUpdateProjectBodyParameters = {
    name?: string;
    description?: string;
    url?: string;
    iconURL?: string;
    termsURL?: string;
    privacyURL?: string;
};

export type CoreUpdateProjectParameters = CoreUpdateProjectPathParameters &
    CoreUpdateProjectBodyParameters;
export type CoreUpdateProjectResponse = {
    project: ProjectObject;
};

/**
 * DELETE /projects/:projectId
 * 프로젝트를 삭제합니다.
 */
export const CoreDeleteProject: Endpoint<
    CoreDeleteProjectParameters,
    CoreDeleteProjectResponse
> = {
    path: (e) => `/projects/${e.projectId}`,
    method: "DELETE",
    pathParams: ["projectId"],
};
export type CoreDeleteProjectPathParameters = {
    projectId: number;
};
export type CoreDeleteProjectParameters = CoreDeleteProjectPathParameters;
export type CoreDeleteProjectResponse = Record<string, never>;
