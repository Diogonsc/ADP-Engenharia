-- Tabela de projetos
create table if not exists public.projects (
  id          bigserial primary key,
  title       text not null,
  tag         text not null,
  type        text not null,
  meta        text not null default '',
  category    text not null check (category in ('lt', 'se', 'industrial')),
  image_url   text,
  description text not null default '',
  highlights  text[] not null default '{}',
  "order"     integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Trigger de updated_at (reutiliza a função já criada na migration de artigos)
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Seed: projetos hardcoded migrados para o banco
insert into public.projects (title, tag, type, meta, category, image_url, description, highlights, "order") values
(
  'Linha de Transmissão 500kV — Norte/SE',
  'LT 500kV',
  'Linha de Transmissão',
  'Cliente: Eletronorte · Jan–Dez 2023',
  'lt',
  'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop',
  'Projeto executivo de linha de transmissão em extra-alta tensão, com integração entre disciplinas elétrica, civil e estrutural para interligação regional.',
  array['Traçado e dimensionamento de vãos','Estudos elétricos e de proteção','Projeto de estruturas e fundações','Compatibilização multidisciplinar'],
  1
),
(
  'Subestação 230/138kV Vale do Aço',
  'SE 230kV',
  'Subestação',
  'Cliente: Transmissora · 2022–2023',
  'se',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1170&auto=format&fit=crop',
  'Subestação de fronteira com arranjo otimizado para operação em múltiplos níveis de tensão, incluindo automação, proteção e malha de aterramento.',
  array['Projeto básico e executivo','Configuração de IEDs e SCADA','Malha de aterramento','Memoriais técnicos para licenciamento'],
  2
),
(
  'LT 138kV Interligação Industrial',
  'LT 138kV',
  'Linha de Transmissão',
  'Cliente: EPCista · 2023',
  'industrial',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1170&auto=format&fit=crop',
  'Linha de transmissão dedicada à conexão de carga industrial, com foco em confiabilidade operacional e interfaces com o parque fabril.',
  array['Definição de tipologia de estruturas','Estudos de curto-circuito','Coordenação com área industrial','Pacote documental para implantação'],
  3
),
(
  'Ampliação SE 500kV Sudeste',
  'SE 500kV',
  'Subestação',
  'Cliente: Transmissora · 2024',
  'se',
  'https://images.unsplash.com/photo-1581094790079-0f9e0a0192b1?q=80&w=1170&auto=format&fit=crop',
  'Ampliação de bay e equipamentos em subestação existente, com revisão de arranjos, curto-circuito e planos de comissionamento.',
  array['Engenharia de ampliação','Estudos de coordenação de proteção','As-built e rastreabilidade','Suporte técnico em campo'],
  4
),
(
  'LT 230kV Eólica Nordeste',
  'LT 230kV',
  'Linha de Transmissão',
  'Cliente: Geradora · 2023–2024',
  'lt',
  'https://images.unsplash.com/photo-1466611651331-6298950642c2?q=80&w=1170&auto=format&fit=crop',
  'Linha de evacuação para parque eólico, com análise de integração à rede e critérios de conexão do operador.',
  array['Estudos de fluxo de potência','Dimensionamento de condutores','Interface com subestação coletora','Acompanhamento de homologação'],
  5
),
(
  'SE Coletora Solar 138kV',
  'SE 138kV',
  'Subestação',
  'Cliente: Solar · 2024',
  'se',
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1170&auto=format&fit=crop',
  'Subestação coletora para empreendimento fotovoltaico, com projeto integrado de proteção, medição e teleproteção.',
  array['Arranjo unifilar e layout','Proteção e medição fiscal','Teleproteção e comunicação','Entrega para energização'],
  6
);
