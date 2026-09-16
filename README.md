# PPA ANAC 95+ — V11 Login Corrigido

Correção do login: a configuração pública do Supabase agora fica diretamente no
index.html, eliminando a dependência do carregamento de config.js para iniciar a
autenticação. O config.js permanece incluído para compatibilidade.

Também foi criada uma nova versão de cache do Service Worker.

Recuperação offline:
- disponível para dispositivos previamente autorizados;
- utiliza o código de recuperação local;
- altera a palavra-passe local do dispositivo;
- alteração da palavra-passe no servidor exige Internet.

Substitua os ficheiros existentes pelos deste pacote e faça um único commit na main.
