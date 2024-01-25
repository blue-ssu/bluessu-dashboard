import { Endpoint } from "endpoint-client";
import { MemberObject } from "..";

/**
 * GET /users/:userId/members
 * 유저가 멤버로 있는 프로젝트의 멤버 리스트를 가져옵니다.
 */
export const CoreListUserMember: Endpoint<
    CoreListUserMemberParameters,
    CoreListUserMemberResponse
> = {
    path: (e) => `/users/${e.userId}/members`,
    method: "GET",
    pathParams: ["userId"],
};
export type CoreListUserMemberPathParameters = {
    userId: number | "me";
};
export type CoreListUserMemberParameters = CoreListUserMemberPathParameters;
export type CoreListUserMemberResponse = {
    members: MemberObject[];
};
