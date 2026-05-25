-- URL do vídeo do projeto (YouTube)
alter table public.projects
  add column if not exists video_url text;

comment on column public.projects.video_url is 'URL do vídeo do projeto no YouTube';
