# PPA ANAC 95+ — MAX R2

Melhorias desta revisão:
- motor de questões sem repetição cíclica artificial para completar 50;
- seleção de banco geral por matéria corrigida;
- banco de cálculos seleciona a matéria inteira;
- revisão usa capítulos anteriores e prioriza erros;
- bloqueios 95% reforçados no início de cada fase;
- áudio de explicações das respostas;
- novos diagramas offline (nuvens, frentes, altimetria);
- simulado METEO gerado a partir do METAR real guardado/atualizado;
- METEO continua com cache e timestamp;
- cache PWA atualizado para MAX R2;
- question_bank_audit.json documenta limitações reais do banco.

## Pendências conhecidas
O material integral fornecido pelo aluno ainda precisa ser incorporado capítulo a capítulo. O banco atual não possui 50 questões genuinamente únicas para cada capítulo, portanto a aplicação agora prefere mostrar apenas questões únicas disponíveis em vez de repetir perguntas para simular quantidade. A classificação automática por capítulo é uma heurística de transição e precisa ser substituída por metadados validados a partir das fontes do aluno. AIRMET mundial não é fornecido pela mesma API pública do AWC e requer fonte regional/OPMET apropriada.
