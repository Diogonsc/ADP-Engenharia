import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Project, ProjectFormData } from "@/data/projects";
import {
  fetchProjects,
  createProject as apiCreate,
  updateProject as apiUpdate,
  setProjectFeatured as apiSetFeatured,
  deleteProject as apiDelete,
} from "@/lib/projects-api";
import { getErrorMessage } from "@/lib/errors";

type ProjectsContextValue = {
  projects: Project[];
  loading: boolean;
  error: string | null;
  getProjectById: (id: number) => Project | undefined;
  createProject: (data: ProjectFormData) => Promise<Project>;
  updateProject: (id: number, data: ProjectFormData) => Promise<Project>;
  setProjectFeatured: (id: number, featured: boolean) => Promise<Project>;
  deleteProject: (id: number, imageUrl?: string) => Promise<void>;
  refetch: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export { ProjectsContext };

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(getErrorMessage(err, "Erro ao carregar projetos"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getProjectById = useCallback(
    (id: number) => projects.find((p) => p.id === id),
    [projects],
  );

  const createProject = useCallback(async (data: ProjectFormData) => {
    const project = await apiCreate(data);
    setProjects((prev) =>
      [...prev, project].sort((a, b) => a.order - b.order),
    );
    return project;
  }, []);

  const updateProject = useCallback(
    async (id: number, data: ProjectFormData) => {
      const updated = await apiUpdate(id, data);
      setProjects((prev) =>
        prev
          .map((p) => (p.id === id ? updated : p))
          .sort((a, b) => a.order - b.order),
      );
      return updated;
    },
    [],
  );

  const setProjectFeatured = useCallback(async (id: number, featured: boolean) => {
    const updated = await apiSetFeatured(id, featured);
    setProjects((prev) =>
      prev
        .map((p) => (p.id === id ? updated : p))
        .sort((a, b) => a.order - b.order),
    );
    return updated;
  }, []);

  const deleteProject = useCallback(async (id: number, imageUrl?: string) => {
    await apiDelete(id, imageUrl);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      projects,
      loading,
      error,
      getProjectById,
      createProject,
      updateProject,
      setProjectFeatured,
      deleteProject,
      refetch: load,
    }),
    [
      projects,
      loading,
      error,
      getProjectById,
      createProject,
      updateProject,
      setProjectFeatured,
      deleteProject,
      load,
    ],
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}
