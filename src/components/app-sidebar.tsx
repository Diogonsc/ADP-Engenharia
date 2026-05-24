import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FileTextIcon, FolderKanbanIcon } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabase";

const navMain = [
  {
    title: "Artigos",
    url: "/admin/articles",
    icon: <FileTextIcon />,
    isActive: false,
    items: [
      {
        title: "Todos os artigos",
        url: "/admin/articles",
      },
      {
        title: "Novo artigo",
        url: "/admin/articles/new",
      },
    ],
  },
  {
    title: "Projetos",
    url: "/admin/projects",
    icon: <FolderKanbanIcon />,
    isActive: false,
    items: [
      {
        title: "Todos os projetos",
        url: "/admin/projects",
      },
      {
        title: "Novo projeto",
        url: "/admin/projects/new",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState({
    name: "Admin",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          name:
            data.user.user_metadata?.name ??
            data.user.email?.split("@")[0] ??
            "Admin",
          email: data.user.email ?? "",
          avatar: data.user.user_metadata?.avatar_url ?? "",
        });
      }
    });
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/admin/articles">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand font-display text-sm font-bold text-white">
                  A
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ADP Engenharia</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Painel administrativo
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} label="Administração" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
