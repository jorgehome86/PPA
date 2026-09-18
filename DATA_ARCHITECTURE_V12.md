# PPA ANAC 95+ V12 — Offline Data Architecture

## Invariants
1. Download first; validate; write atomically; only then replace the active local version.
2. A failed download never deletes the previous usable local copy.
3. A chart removed from a successfully refreshed official catalog is removed locally after catalog reconciliation.
4. METAR/TAF offline copies preserve product time, feed generation time and download time.
5. Offline data is never labelled LIVE merely because a cached file exists.
6. Chart URLs are never invented: only links discovered in the AISWEB catalog are eligible.

## Storage
- IndexedDB `ppa95_offline_v12` / store `products`: downloaded weather and chart blobs.
- Stable keys: weather `wx:<type>:<ICAO>`; charts derived from official catalog identity.
- Existing course material store remains separate for user-added files.
- CacheStorage remains for application shell/Flight Pack assets; downloaded aviation products use IndexedDB.

## Server-side refresh requirement
AviationWeather.gov explicitly does not permit browser CORS for its API. Therefore current METAR/TAF must be refreshed server-side (GitHub Actions or an Edge Function) and then consumed by the PWA. The included workflow refreshes local feed files. Direct browser calls are intentionally not relied upon.

AISWEB chart discovery is also performed server-side by `scripts/build_aisweb_catalog.py`. The parser keeps only public/Ostensivo rows with a real `/download/` link found in AISWEB HTML. If parsing returns zero entries, the script fails without replacing the existing catalog.

## Not yet claimed
- Successful live AISWEB mass-download in the execution container (network DNS unavailable during this build).
- Successful deployed GitHub Actions run.
- Successful iPhone/iPad Safari quota/persistence behavior.
- Complete mirroring of every official chart PDF into a same-origin host. The client database/replacement engine is ready for a catalog containing downloadable URLs; deployment must provide URLs that are fetchable by the PWA (same-origin mirror/proxy if AISWEB blocks CORS).
