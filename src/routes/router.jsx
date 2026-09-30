import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProjectsHub from "../pages/ProjectsHub.jsx";
import ProjectDashboard from "../pages/ProjectDashboard.jsx";
import ProjectDocuments from "../pages/ProjectDocuments.jsx";
import ProjectChat from "../pages/ProjectChat.jsx";
import ProjectMembers from "../pages/ProjectMembers.jsx";
import ProjectSettings from "../pages/ProjectSettings.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import AdminOverview from "../pages/admin/AdminOverview.jsx";
import AdminUsers from "../pages/admin/AdminUsers.jsx";
import AdminProjects from "../pages/admin/AdminProjects.jsx";
import { AdminRoute, UserRoute, AuthRoute, ProtectedRoute } from "./guards.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Login /></AuthRoute>
    },
    {
        path: "/login",
        element: <AuthRoute><Login /></AuthRoute>
    },
    {
        path: "/register",
        element: <AuthRoute><Register /></AuthRoute>
    },
    {
        path: "/projects",
        element: <UserRoute><ProjectsHub /></UserRoute>
    },
    {
        path: "/dashboard",
        element: <UserRoute><ProjectDashboard /></UserRoute>
    },
    {
        path: "/projects/:id",
        element: <UserRoute><ProjectDashboard /></UserRoute>
    },
    {
        path: "/projects/:id/dashboard",
        element: <UserRoute><ProjectDashboard /></UserRoute>
    },
    {
        path: "/documents",
        element: <UserRoute><ProjectDocuments /></UserRoute>
    },
    {
        path: "/projects/:id/documents",
        element: <UserRoute><ProjectDocuments /></UserRoute>
    },
    {
        path: "/chat",
        element: <UserRoute><ProjectChat /></UserRoute>
    },
    {
        path: "/projects/:id/chat",
        element: <UserRoute><ProjectChat /></UserRoute>
    },
    {
        path: "/members",
        element: <UserRoute><ProjectMembers /></UserRoute>
    },
    {
        path: "/projects/:id/members",
        element: <UserRoute><ProjectMembers /></UserRoute>
    },
    {
        path: "/settings",
        element: <UserRoute><ProjectSettings /></UserRoute>
    },
    {
        path: "/projects/:id/settings",
        element: <UserRoute><ProjectSettings /></UserRoute>
    },
    {
        path: "/profile",
        element: <ProtectedRoute><UserProfile /></ProtectedRoute>
    },
    {
        path: "/admin",
        element: <AdminRoute><AdminOverview /></AdminRoute>
    },
    {
        path: "/admin/overview",
        element: <AdminRoute><AdminOverview /></AdminRoute>
    },
    {
        path: "/admin/users",
        element: <AdminRoute><AdminUsers /></AdminRoute>
    },
    {
        path: "/admin/projects",
        element: <AdminRoute><AdminProjects /></AdminRoute>
    }
]);

export default router;