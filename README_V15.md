# PPA ANAC 95+ — V15 5 Livros & Perfis

Esta versão continua a V14 e integra os cinco livros como banco de simulados para **Jorge e Cândido**. A leitura dos PDFs e o guia de estudo aparecem **somente para Cândido**.

## Banco dos cinco livros
- Exercícios diretos extraídos dos livros antes da deduplicação: **1139**
- Questões diretas únicas após fundir repetições exatas: **1135**
- Repetições exatas fundidas: **4**
- Questões derivadas da leitura frase a frase (definições/afirmações de alta confiança): **1383**
- Exercícios de cálculo derivados com resolução passo a passo: **120**
- Banco PPA dos cinco livros nesta versão: **2638**
- Questões IFR adicionais separadas do PPA normal: **100**
- Exercícios diretos identificados como cálculo: **210**

Os gabaritos das questões diretas foram lidos das páginas de gabarito dos próprios livros. O banco IFR permanece extra e não entra automaticamente na prova PPA.

## Perfis
- **Jorge:** banco completo dos cinco livros disponível nos simulados; PDFs dos livros não aparecem no guia de leitura.
- **Cândido:** mesmo banco de simulados + leitura offline dos cinco PDFs, com marcador local de página.
- Progresso separado por perfil em `localStorage`.

## Repetições
A deduplicação compara enunciado e conjunto de alternativas normalizados. Questões com enunciado genérico mas alternativas diferentes não são removidas indevidamente.

## Abrir
Extraia o ZIP e abra `index.html`. Para instalação PWA/Service Worker, sirva a pasta por HTTP/HTTPS (por exemplo com um servidor local).
