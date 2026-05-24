#!/bin/bash
# Setup Supabase — ADP Engenharia
# Execute após criar o projeto no dashboard e preencher .env.local

set -e

echo "==> Instalando Supabase CLI (se não tiver)..."
# No macOS: brew install supabase/tap/supabase
# No Linux: veja https://supabase.com/docs/guides/cli

echo "==> Login no Supabase..."
supabase login

echo "==> Linkando projeto..."
# Substitua SEU_PROJECT_REF pelo ref do seu projeto (dashboard > Project Settings > General)
supabase link --project-ref SEU_PROJECT_REF

echo "==> Rodando migrations..."
supabase db push

echo "==> Verificando status..."
supabase db diff

echo ""
echo "✅ Setup concluído!"
echo ""
echo "Próximos passos:"
echo "1. Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.local"
echo "2. Crie um usuário admin em: Authentication > Users no dashboard do Supabase"
echo "3. Rode: npm run dev"
