import { Endpoint } from "endpoint-client";
import { MemberObject } from "..";

/**
 * GET /projects/:projectId/members
 * 프로젝트의 멤버 리스트를 가져옵니다.
 */
export const CoreListProjectMember: Endpoint<
    CoreListProjectMemberParameters,
    CoreListProjectMemberResponse
> = {
    path: (e) => `/projects/${e.projectId}/members`,
    method: "GET",
    pathParams: ["projectId"],
};
export type CoreListProjectMemberPathParameters = {
    projectId: number;
};
export type CoreListProjectMemberParameters =
    CoreListProjectMemberPathParameters;
export type CoreListProjectMemberResponse = {
    members: MemberObject[];
};

/**
 * POST /projects/:projectId/members
 * 프로젝트에 멤버를 추가합니다.
 */
export const CoreAddMemberToProject: Endpoint<
    CoreAddMemberToProjectParameters,
    CoreAddMemberToProjectResponse
> = {
    path: (e) => `/projects/${e.projectId}/members`,
    method: "POST",
    pathParams: ["projectId"],
    bodyParams: ["userId"],
};
export type CoreAddMemberToProjectPathParameters = {
    projectId: number;
};
export type CoreAddMemberToProjectBody = {
    userId: number;
};
export type CoreAddMemberToProjectParameters =
    CoreAddMemberToProjectPathParameters & CoreAddMemberToProjectBody;
export type CoreAddMemberToProjectResponse = {
    member: MemberObject;
};

/**
 * DELETE /projects/:projectId/members/:userId
 * 프로젝트에서 멤버를 제거합니다.
 */
export const CoreRemoveMemberFromProject: Endpoint<
    CoreRemoveMemberFromProjectParameters,
    CoreRemoveMemberFromProjectResponse
> = {
    path: (e) => `/projects/${e.projectId}/members/${e.memberId}`,
    method: "DELETE",
    pathParams: ["projectId", "memberId"],
};
export type CoreRemoveMemberFromProjectPathParameters = {
    projectId: number;
    memberId: number;
};
export type CoreRemoveMemberFromProjectParameters =
    CoreRemoveMemberFromProjectPathParameters;
export type CoreRemoveMemberFromProjectResponse = Record<string, never>;

/**
 * PATCH /projects/:projectId/members/:memberId/role
 * 프로젝트의 멤버의 역할을 변경합니다.
 */
export const CoreUpdateMemberRole: Endpoint<
    CoreUpdateMemberRoleParameters,
    CoreUpdateMemberRoleResponse
> = {
    path: (e) => `/projects/${e.projectId}/members/${e.memberId}/role`,
    method: "PATCH",
    pathParams: ["projectId", "memberId"],
    bodyParams: ["role"],
};
export type CoreUpdateMemberRolePathParameters = {
    projectId: number;
    memberId: number;
};
export type CoreUpdateMemberRoleBody = {
    role: string;
};
export type CoreUpdateMemberRoleParameters =
    CoreUpdateMemberRolePathParameters & CoreUpdateMemberRoleBody;
export type CoreUpdateMemberRoleResponse = {
    member: MemberObject;
};
