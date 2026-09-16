# PPA ANAC 95+ — V10 Recuperação Offline

Versão baseada no V8/V9 real da aplicação, com recuperação offline reforçada.

## Recuperação offline
- O dispositivo precisa ter sido autorizado previamente, após um login online bem-sucedido.
- A aplicação gera um código de recuperação e guarda apenas o seu hash localmente.
- O código deve ser guardado fora do telefone.
- Sem Internet, o código permite redefinir a palavra-passe **local daquele dispositivo**.
- A recuperação offline não altera a palavra-passe do servidor Supabase; isso exige Internet.
- Depois de uma recuperação offline, a aplicação marca que a palavra-passe local pode ser diferente da palavra-passe online.

## Publicação
Substitua os ficheiros do repositório pelos ficheiros deste pacote e faça um único commit na branch main.
Não coloque nenhuma chave secret/service_role no frontend.
