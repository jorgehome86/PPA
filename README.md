# PPA ANAC 95+ — VERSÃO COMPLETA

Inclui: mapa de matérias/capítulos, conteúdo de estudo, esquemas visuais offline, leitura em voz alta offline, pesquisa de vídeos online, 50 memorização + 50 validação, regra 95%+, progressão por capítulo, caderno de erros, cálculos desbloqueáveis por matéria (estrutura), simulados, modo reta final, calendário, export/import, PWA offline e sincronização Supabase.

## Importante
O banco incorporado contém 1.240 questões de treino fornecidas no projeto (1.000 normais + 240 cálculos). Elas não são questões oficiais da ANAC. A fonte/explicação é mantida quando existente.

## Cloud
O frontend usa a publishable key do Supabase. A secret/service key permanece apenas na Edge Function. Publique `supabase/functions/login-with-username/index.ts` como a função `login-with-username` e mantenha JWT verification desligada se a função for pública e fizer a própria autenticação.

## GitHub Pages
Suba o conteúdo da pasta para a raiz do repositório `jorgehome86/PPA`, branch `main`.
