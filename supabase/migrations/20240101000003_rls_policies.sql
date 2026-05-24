-- ==========================================
-- RLS: tabela articles
-- ==========================================
alter table public.articles enable row level security;

-- Qualquer visitante pode ler artigos publicados
create policy "public_read_published"
  on public.articles
  for select
  using (status = 'published');

-- Apenas usuários autenticados (admin) podem ler rascunhos e tudo mais
create policy "admin_read_all"
  on public.articles
  for select
  using (auth.role() = 'authenticated');

-- Apenas autenticados podem inserir
create policy "admin_insert"
  on public.articles
  for insert
  with check (auth.role() = 'authenticated');

-- Apenas autenticados podem atualizar
create policy "admin_update"
  on public.articles
  for update
  using (auth.role() = 'authenticated');

-- Apenas autenticados podem deletar
create policy "admin_delete"
  on public.articles
  for delete
  using (auth.role() = 'authenticated');

-- ==========================================
-- RLS: Storage bucket article-images
-- ==========================================

-- Qualquer um pode visualizar imagens (bucket público)
create policy "public_read_images"
  on storage.objects
  for select
  using (bucket_id = 'article-images');

-- Apenas autenticados podem fazer upload
create policy "admin_upload_images"
  on storage.objects
  for insert
  with check (
    bucket_id = 'article-images'
    and auth.role() = 'authenticated'
  );

-- Apenas autenticados podem atualizar/substituir
create policy "admin_update_images"
  on storage.objects
  for update
  using (
    bucket_id = 'article-images'
    and auth.role() = 'authenticated'
  );

-- Apenas autenticados podem deletar
create policy "admin_delete_images"
  on storage.objects
  for delete
  using (
    bucket_id = 'article-images'
    and auth.role() = 'authenticated'
  );
