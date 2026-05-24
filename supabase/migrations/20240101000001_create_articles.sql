-- Tabela de artigos
create table if not exists public.articles (
  id          bigserial primary key,
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  content     text,
  category    text not null check (category in ('lt', 'se', 'automacao', 'gestao')),
  image_url   text,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Trigger para atualizar updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- Seed: artigos iniciais
insert into public.articles (slug, title, excerpt, content, category, image_url, status) values
(
  'design-review-lt',
  'Design Review em Projetos de Linhas de Transmissão',
  'Como uma revisão independente reduz retrabalho na fase de implantação e antecipa interfaces críticas entre disciplinas.',
  '<p>A revisão de design em projetos de linhas de transmissão é uma etapa crítica para garantir a qualidade técnica e reduzir retrabalho durante a implantação.</p><p>Neste artigo, abordamos metodologias, checklists e boas práticas adotadas pela ADP Engenharia em empreendimentos de extra-alta tensão.</p>',
  'lt',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1170&auto=format&fit=crop',
  'published'
),
(
  'iec-61850',
  'IEC 61850 e a Integração de Sistemas em Subestações',
  'Boas práticas para implementação de barramento de processo e integração entre IEDs em subestações de alta tensão.',
  '<p>A norma IEC 61850 revolucionou a comunicação em subestações, permitindo interoperabilidade entre equipamentos de diferentes fabricantes.</p><p>Discutimos arquiteturas de rede, modelos de dados e estratégias de migração para sistemas legados.</p>',
  'se',
  'https://images.unsplash.com/photo-1623039405147-547794f92e9e?q=80&w=826&auto=format&fit=crop',
  'published'
),
(
  'coordenacao-multidisciplinar',
  'Coordenação Multidisciplinar em Empreendimentos de Energia',
  'O papel da engenharia integradora na gestão de interfaces, controle documental e rastreabilidade.',
  '<p>Empreendimentos de energia envolvem dezenas de disciplinas que precisam trabalhar de forma integrada.</p><p>A engenharia integradora atua como elo central, garantindo rastreabilidade, controle de interfaces e cumprimento de prazos.</p>',
  'gestao',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop',
  'published'
),
(
  'protecao-redes',
  'Sistemas de Proteção em Redes de Transmissão',
  'Critérios de ajuste, seletividade e coordenação de proteção em linhas de extra-alta tensão.',
  '<p>O ajuste correto dos sistemas de proteção é fundamental para a confiabilidade das redes de transmissão.</p><p>Apresentamos critérios técnicos, ferramentas de simulação e estudos de caso em linhas de EAT.</p>',
  'automacao',
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1170&auto=format&fit=crop',
  'draft'
),
(
  'aterramento-se',
  'Cálculo de Aterramento em Subestações de Alta Tensão',
  'Metodologias e normas aplicáveis ao dimensionamento de malhas de aterramento em SE.',
  '<p>O dimensionamento da malha de aterramento em subestações exige análise detalhada do solo, correntes de falta e requisitos normativos.</p><p>Revisamos métodos de cálculo, softwares utilizados e verificação em campo.</p>',
  'se',
  'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?q=80&w=1769&auto=format&fit=crop',
  'published'
),
(
  'lt-renovavel',
  'Conexão de Geração Renovável via Linhas de Transmissão',
  'Desafios técnicos e soluções de engenharia para integração de parques eólicos e solares.',
  '<p>A expansão de geração renovável impõe novos desafios à conexão em linhas de transmissão existentes.</p><p>Analisamos estudos de fluxo de potência, restrições de capacidade e soluções de reforço de rede.</p>',
  'lt',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1170&auto=format&fit=crop',
  'published'
);
