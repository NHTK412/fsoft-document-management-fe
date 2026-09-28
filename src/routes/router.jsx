import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProjectsHub from "../pages/ProjectsHub.jsx";
import ProjectDashboard from "../pages/ProjectDashboard.jsx";
import ProjectDocuments from "../pages/ProjectDocuments.jsx";
import ProjectChat from "../pages/ProjectChat.jsx";
import ProjectMembers from "../pages/ProjectMembers.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/projects",
        element: <ProjectsHub />
    },
    {
        path: "/dashboard",
        element: <ProjectDashboard />
    },
    {
        path: "/projects/:id",
        element: <ProjectDashboard />
    },
    {
        path: "/projects/:id/dashboard",
        element: <ProjectDashboard />
    },
    {
        path: "/documents",
        element: <ProjectDocuments />
    },
    {
        path: "/projects/:id/documents",
        element: <ProjectDocuments />
    },
    {
        path: "/chat",
        element: <ProjectChat />
    },
    {
        path: "/projects/:id/chat",
        element: <ProjectChat />
    },
    {
        path: "/members",
        element: <ProjectMembers />
    },
    {
        path: "/projects/:id/members",
        element: <ProjectMembers />
    }
]);

export default router;