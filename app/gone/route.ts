/**
 * app/gone/route.ts — not directly used, but the middleware below
 * handles 410 Gone for old WordPress URLs.
 * 
 * Old WordPress URLs that Google remembers:
 *   /sample-page/
 *   /2024/12/15/hello-world/
 *   /wp-admin, /wp-login.php, etc.
 * 
 * A 410 Gone tells Google definitively: "this page no longer exists,
 * stop trying to crawl it and remove it from the index".
 * 
 * This is handled via middleware.ts at the root.
 */
export {}
