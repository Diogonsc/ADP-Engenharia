-- Destaque na página inicial
alter table public.projects
  add column if not exists featured boolean not null default false;

alter table public.articles
  add column if not exists featured boolean not null default false;

comment on column public.projects.featured is 'Exibir na seção de projetos da página inicial (máx. 6)';
comment on column public.articles.featured is 'Exibir na seção de artigos da página inicial (máx. 3)';

-- Marca os primeiros registros existentes como destaque
update public.projects
set featured = true
where id in (
  select id from public.projects order by "order" asc, created_at asc limit 6
);

update public.articles
set featured = true
where id in (
  select id from public.articles
  where status = 'published'
  order by created_at desc
  limit 3
);
