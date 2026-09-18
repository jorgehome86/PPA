# PPA ANAC 95+ — V18 Work Handoff

## Base
Use this folder as the current functional base (V17/V18 lineage).

## Approved visual target
The authoritative approved preview is `V18_TODAS_PAGINAS_CORRIGIDA.html`.

## Critical correction for Aulas Jorge
Do NOT use the existing `jorge_lessons.js` mapping as final content. That mapping points Jorge's reader to the Bianch books and is superseded by the approved design.

Aulas Jorge must use the user's original course structure only:
- REG: 19 chapters
- MET: 15 chapters
- NAV: 11 chapters
- TV: 19 chapters
- CT: 23 chapters

The five Bianch books remain separate:
- question-bank source for both profiles;
- Cândido study reader only;
- they must NOT replace Jorge's original lessons.

## Jorge reader behavior
For profile Jorge only:
- catalog by subject and chapter;
- page-by-page reading;
- Previous Page;
- Next Page;
- Go to Page;
- Back to Lessons;
- automatic last-page marker;
- Mark Lesson Complete.

## Preserve
Keep all V17/V18 functionality already present: simulators, 95% progression, mixed exam/banca, external aerodynamics bank, expanded NAV banks, offline functionality, backup/progress separation, Cândido reader, and existing diagnostic modules.

## Publication target
After replacing the Jorge lesson source with the original-course materials, publish the updated Work project and sync the source to GitHub repository `jorgejunqueira1986/PPA-OFFLINE-STUDY` once repository write authorization is available.
