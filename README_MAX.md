# PPA ANAC 95+ — pacote MAX

Este pacote incorpora, nesta versão, os blocos pedidos: METEO online com cache, biblioteca audiovisual, áudio por voz do dispositivo e recuperação de palavra-passe por email.

## METEO
A interface usa a Edge Function `aviation-weather`, que consulta o Aviation Weather Center. O browser não chama diretamente a API porque a documentação atual indica que CORS não é permitido; a função funciona como camada segura de servidor. A API documenta METAR/TAF/SIGMET mundialmente e cobertura regional de G-AIRMET/AIRMET.

Para ativar no Supabase, publique as duas funções:
- `login-with-username`
- `aviation-weather`

Não coloque `service_role`/secret keys no GitHub. A função usa as variáveis secretas do ambiente Supabase.

## Áudio
O app usa `SpeechSynthesis` em português-Portugal para resumo de capítulos e explicações. Funciona offline quando o navegador/dispositivo disponibiliza uma voz local.

## Audiovisual
`media_library.json` contém fontes oficiais e a aplicação apresenta uma biblioteca com links para FAA, Aviation Weather Center e WMO, além de pesquisa de vídeos por tema. O objetivo é apontar para conteúdo externo sem copiar material protegido para dentro do app.

## Limitação importante
A cobertura de AIRMET não é mundial na API pública do AWC. Para cobertura OPMET global/regional adicional, pode-se ligar WIFS/IWXXM com credenciais apropriadas.
