import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./pages/notFound.page";
import { SignInPage } from "./pages/auth/signin.page";
import { AuthPage } from "./pages/auth/index.page";
import { ProjectsPage } from "./pages/project/index.page";
import { CreateProjectPage } from "./pages/project/create.page";
import { ProjectPage } from "./pages/project/[projectId]/index.page";
import { ProjectMemberPage } from "./pages/project/[projectId]/member.page";
import { ProjectSecretPage } from "./pages/project/[projectId]/secret.page";
import { ProjectDangerPage } from "./pages/project/[projectId]/danger.page";
import { MainPage } from "./pages/main/index.page";

export const indexRouter = createBrowserRouter([
    {
        path: "*",
        element: <NotFoundPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/auth/signin",
        element: <SignInPage />,
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/projects",
        element: <ProjectsPage />,
    },
    {
        path: "/projects/create",
        element: <CreateProjectPage />,
    },
    {
        path: "projects/:projectId",
        element: <ProjectPage />,
    },
    {
        path: "projects/:projectId/secret",
        element: <ProjectSecretPage />,
    },
    {
        path: "projects/:projectId/member",
        element: <ProjectMemberPage />,
    },
    {
        path: "projects/:projectId/danger",
        element: <ProjectDangerPage />,
    },
]);
