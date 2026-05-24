-- RLS: tabela projects
alter table public.projects enable row level security;

-- Visitantes leem todos os projetos (portfólio público)
create policy "public_read_projects"
  on public.projects
  for select
  using (true);

-- Apenas autenticados podem inserir, atualizar e deletar
create policy "admin_insert_projects"
  on public.projects
  for insert
  with check (auth.role() = 'authenticated');

create policy "admin_update_projects"
  on public.projects
  for update
  using (auth.role() = 'authenticated');

create policy "admin_delete_projects"
  on public.projects
  for delete
  using (auth.role() = 'authenticated');

-- RLS: Storage — bucket article-images já cobre imagens de projetos
-- (mesmo bucket, mesma política — não criar políticas duplicadas)
