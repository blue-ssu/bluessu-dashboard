import { Endpoint } from "endpoint-client";
import { UserObject } from "../objects";

/**
 * GET /users/:userId
 * 유저 정보를 가져옵니다.
 */
export const CoreGetUser: Endpoint<CoreGetUserParameters, CoreGetUserResponse> =
    {
        path: (e) => `/users/${e.userId}`,
        method: "GET",
        pathParams: ["userId"],
    };

export type CoreGetUserPathParameters = {
    userId: number | "me";
};
export type CoreGetUserParameters = CoreGetUserPathParameters;
export type CoreGetUserResponse = {
    user: UserObject;
};
