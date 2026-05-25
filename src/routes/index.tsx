import { RootLayout } from "@/layouts/root-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { LandingPage } = await import("@/pages/landing-page");
          return { Component: LandingPage };
        },
      },
      {
        path: "/articles",
        lazy: async () => {
          const { ArticlesPage } = await import("@/pages/articles-page");
          return { Component: ArticlesPage };
        },
      },
      {
        path: "/articles/:slug",
        lazy: async () => {
          const { ArticlePage } = await import("@/pages/article-page");
          return { Component: ArticlePage };
        },
      },
      {
        path: "/projects",
        lazy: async () => {
          const { ProjectsPage } = await import("@/pages/projects-page");
          return { Component: ProjectsPage };
        },
      },
    ],
  },
  {
    path: "/admin/login",
    lazy: async () => {
      const { AdminLoginPage } = await import("@/pages/admin/login");
      return { Component: AdminLoginPage };
    },
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        lazy: async () => {
          const { AdminLayout } = await import("@/layouts/admin-layout");
          return { Component: AdminLayout };
        },
        children: [
          {
            index: true,
            element: <Navigate to="/admin/articles" replace />,
          },
          {
            path: "articles",
            lazy: async () => {
              const { AdminArticlesPage } = await import(
                "@/pages/admin/articles/index"
              );
              return { Component: AdminArticlesPage };
            },
          },
          {
            path: "articles/new",
            lazy: async () => {
              const { AdminArticleCreatePage } = await import(
                "@/pages/admin/articles/new"
              );
              return { Component: AdminArticleCreatePage };
            },
          },
          {
            path: "articles/:id",
            lazy: async () => {
              const { AdminArticleViewPage } = await import(
                "@/pages/admin/articles/view"
              );
              return { Component: AdminArticleViewPage };
            },
          },
          {
            path: "articles/:id/edit",
            lazy: async () => {
              const { AdminArticleEditPage } = await import(
                "@/pages/admin/articles/edit"
              );
              return { Component: AdminArticleEditPage };
            },
          },
          {
            path: "projects",
            lazy: async () => {
              const { AdminProjectsPage } = await import(
                "@/pages/admin/projects/index"
              );
              return { Component: AdminProjectsPage };
            },
          },
          {
            path: "projects/new",
            lazy: async () => {
              const { AdminProjectCreatePage } = await import(
                "@/pages/admin/projects/new"
              );
              return { Component: AdminProjectCreatePage };
            },
          },
          {
            path: "projects/:id",
            lazy: async () => {
              const { AdminProjectViewPage } = await import(
                "@/pages/admin/projects/view"
              );
              return { Component: AdminProjectViewPage };
            },
          },
          {
            path: "projects/:id/edit",
            lazy: async () => {
              const { AdminProjectEditPage } = await import(
                "@/pages/admin/projects/edit"
              );
              return { Component: AdminProjectEditPage };
            },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    lazy: async () => {
      const { NotFoundPage } = await import("@/pages/not-found-page");
      return { Component: NotFoundPage };
    },
  },
]);
