import { RootLayout } from "@/layouts/root-layout";
import { AdminLayout } from "@/layouts/admin-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { LandingPage } from "@/pages/landing-page";
import { ArticlesPage } from "@/pages/articles-page";
import { ArticlePage } from "@/pages/article-page";
import { ProjectsPage } from "@/pages/projects-page";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminLoginPage } from "@/pages/admin/login";
import { AdminArticlesPage } from "@/pages/admin/articles/index";
import { AdminArticleCreatePage } from "@/pages/admin/articles/new";
import { AdminArticleViewPage } from "@/pages/admin/articles/view";
import { AdminArticleEditPage } from "@/pages/admin/articles/edit";
import { AdminProjectsPage } from "@/pages/admin/projects/index";
import { AdminProjectCreatePage } from "@/pages/admin/projects/new";
import { AdminProjectViewPage } from "@/pages/admin/projects/view";
import { AdminProjectEditPage } from "@/pages/admin/projects/edit";
import { NotFoundPage } from "@/pages/not-found-page";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/articles",
        element: <ArticlesPage />,
      },
      {
        path: "/articles/:slug",
        element: <ArticlePage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/articles" replace />,
          },
          {
            path: "articles",
            element: <AdminArticlesPage />,
          },
          {
            path: "articles/new",
            element: <AdminArticleCreatePage />,
          },
          {
            path: "articles/:id",
            element: <AdminArticleViewPage />,
          },
          {
            path: "articles/:id/edit",
            element: <AdminArticleEditPage />,
          },
          {
            path: "projects",
            element: <AdminProjectsPage />,
          },
          {
            path: "projects/new",
            element: <AdminProjectCreatePage />,
          },
          {
            path: "projects/:id",
            element: <AdminProjectViewPage />,
          },
          {
            path: "projects/:id/edit",
            element: <AdminProjectEditPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
