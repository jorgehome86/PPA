# PPA ANAC 95+ — FINAL FINAL FINAL FUNCIONAL

Correção crítica do banco de dados local.

O estado da interface usa siglas REG/NAV/CT/MET/TV, enquanto o banco legado armazena os nomes completos das matérias. A versão anterior comparava diretamente estes dois formatos e devolvia zero questões em Estudo/Banco por matéria. Esta versão normaliza a matéria antes de consultar o banco.

Também foi atualizado o cache do Service Worker para `ppa-anac-functional-1`.
