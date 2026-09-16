# PPA ANAC 95+ — FINAL

Pacote final consolidado da aplicação PWA.

## Publicação no GitHub Pages
Copie o conteúdo desta pasta para a raiz do repositório `PPA`, substituindo os ficheiros antigos. Mantenha também a pasta `supabase/functions`.

## Supabase
1. Execute `supabase.sql` uma vez no SQL Editor (ou confirme que o schema já está aplicado).
2. Publique as Edge Functions `login-with-username` e `aviation-weather`.
3. A secret `SUPABASE_SECRET_KEYS` permanece apenas no servidor; nunca deve ser colocada no GitHub.

## Funcionalidades consolidadas
- PWA instalável e estudo offline após o primeiro carregamento.
- Login online por username, recuperação por email e sincronização Supabase.
- Regra 95% e bloqueio sequencial de capítulos.
- Memorização e validação separadas por capítulo.
- Banco normal por matéria e cálculos desbloqueados após 95%.
- Simulado final 20 questões / 4 por matéria com cronómetros definidos no projeto.
- Caderno de erros, notas, favoritos, progresso e backup local.
- METEO ao vivo via Edge Function com cache e indicação de atualização.
- Biblioteca audiovisual e TTS.
- Calendário de estudo e Modo Reta Final a partir de 01/11/2026.

## Nota de conteúdo
As questões de treino não são apresentadas como questões oficiais da ANAC. O banco R4 é classificado por matéria/capítulo/fase e deve continuar a ser validado contra o material original quando novos conteúdos forem incorporados.
