# PPA ANAC 95+ — V14 Base Offline Direta

V14 baixa para IndexedDB a última publicação disponível dos feeds METAR e TAF, além dos produtos individuais consultados. Todas as cartas presentes no catálogo oficial são descarregadas para a mesma base: a substituição é atómica por chave estável, portanto a carta anterior só sai depois de a versão nova ser baixada e gravada com sucesso. O Centro Offline permite abrir diretamente cada ficheiro guardado sem Internet.

V13 acrescenta Modo Banca ANAC (100 questões, 20 por matéria, alternativas reordenadas e sem feedback durante a prova), relatório por matéria, fila de revisão espaçada em 1/3/7/14 dias e competência por tópico registado no histórico.

Educational PWA for ANAC PPA/VFR learning. No login and no X-Plane/external-simulator integration.

V12 adds an offline aviation-data layer: IndexedDB storage, atomic replacement, offline METAR/TAF persistence, chart catalog synchronization, withdrawn-chart reconciliation, persistent-storage request, and a Download/Offline Center.

Important: the storage/versioning engine is implemented and locally tested. Live external synchronization still requires deployment of the included server-side refresh workflow/proxy path. See `TEST_REPORT_V12.txt` and `DATA_ARCHITECTURE_V12.md` for exact verified/pending status.
