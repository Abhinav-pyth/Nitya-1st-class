import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const ORIGIN = 'https://nitya-1st-class.vercel.app';

const raw = fs.readFileSync(path.resolve('src/data/seoContent.ts'), 'utf8')
  .replace(/export interface[\s\S]*?\n}\n/, '')
  .replace(/: SeoPage\[\]/, '')
  .replace(/export const/g, 'const');
const pages = new Function(raw + '; return seoPages;')();

const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const shell = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const styles = [...shell.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)].map(m => m[0]);
const scripts = [...shell.matchAll(/<script[^>]*src="[^"]*"[^>]*><\/script>/g)].map(m => m[0]);

function pageHtml(p) {
  const canonical = ORIGIN + p.route;
  const sectionsHtml = p.sections.map(s => '<section><h2>' + esc(s.heading) + '</h2><p>' + esc(s.body) + '</p></section>').join('\n');
  const qaHtml = p.sampleQuestions.map(x => '<div class="seo-qa"><p><strong>Q:</strong> ' + esc(x.question) + '</p><p><strong>A:</strong> ' + esc(x.answer) + ' \u2014 ' + esc(x.explain) + '</p></div>').join('\n');
  const relatedHtml = p.related.map(r => '<li><a href="' + r.href + '">' + esc(r.label) + '</a></li>').join('\n');
  const crumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: p.breadcrumb.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: ORIGIN + b.href })) };
  const siteLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Nitya Class 1 Learning Buddy', url: ORIGIN + '/', inLanguage: ['en-IN', 'hi-IN'] };
  const resLd = { '@context': 'https://schema.org', '@type': 'LearningResource', name: p.h1, description: p.description, url: canonical, educationalLevel: 'Class 1 (CBSE)', teaches: p.sections.map(s => s.heading), isAccessibleForFree: true, inLanguage: p.route.includes('hindi') ? 'hi' : 'en' };
  const lang = p.route.includes('hindi') ? 'hi' : 'en';

  return ['<!doctype html>',
'<html lang="' + lang + '">',
'<head>',
'<meta charset="UTF-8" />',
'<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'<title>' + esc(p.title) + '</title>',
'<meta name="description" content="' + esc(p.description) + '" />',
'<link rel="canonical" href="' + canonical + '" />',
'<meta name="robots" content="index, follow" />',
'<meta property="og:type" content="website" />',
'<meta property="og:title" content="' + esc(p.title) + '" />',
'<meta property="og:description" content="' + esc(p.description) + '" />',
'<meta property="og:url" content="' + canonical + '" />',
'<meta property="og:image" content="' + ORIGIN + '/og-cover.png" />',
'<meta property="og:site_name" content="Nitya Class 1 Learning Buddy" />',
'<meta name="twitter:card" content="summary_large_image" />',
'<meta name="twitter:title" content="' + esc(p.title) + '" />',
'<meta name="twitter:description" content="' + esc(p.description) + '" />',
'<meta name="twitter:image" content="' + ORIGIN + '/og-cover.png" />',
'<meta name="theme-color" content="#7c3aed" />',
'<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ctext y=\'.9em\' font-size=\'90\'%3E\ud83d\udcda%3C/text%3E%3C/svg%3E" />',
styles.join('\n'),
'<style>.seo-wrap{max-width:860px;margin:0 auto;padding:24px 16px;font-family:Nunito,system-ui,sans-serif;color:#1f2937;line-height:1.6}.seo-wrap h1{font-size:1.9rem;margin:.5em 0}.seo-wrap h2{font-size:1.25rem;margin-top:1.2em}.seo-nav{text-align:center;margin-bottom:16px}.seo-nav a{margin:0 8px;color:#7c3aed;font-weight:700;text-decoration:none}.seo-cta{display:inline-block;background:#7c3aed;color:#fff;padding:12px 22px;border-radius:14px;font-weight:800;text-decoration:none;margin:14px 0}.seo-qa{background:#f5f3ff;border-radius:12px;padding:10px 14px;margin:8px 0}footer.seo-foot{margin-top:32px;font-size:.85rem;color:#6b7280;text-align:center}</style>',
'<script type="application/ld+json">' + JSON.stringify(siteLd) + '</scr' + 'ipt>',
'<script type="application/ld+json">' + JSON.stringify(crumbLd) + '</scr' + 'ipt>',
'<script type="application/ld+json">' + JSON.stringify(resLd) + '</scr' + 'ipt>',
'</head>',
'<body>',
'<div class="seo-wrap">',
'<nav class="seo-nav"><a href="/">Home</a><a href="/class-1-english/">English</a><a href="/class-1-maths/">Maths</a><a href="/class-1-hindi/">Hindi</a><a href="/class-1-evs/">EVS</a><a href="/class-1-gk/">GK</a></nav>',
'<h1>' + esc(p.h1) + '</h1>',
'<p>' + esc(p.intro) + '</p>',
'<a class="seo-cta" href="/?open=' + encodeURIComponent(p.appLink.page) + '">' + esc(p.appLink.label) + '</a>',
sectionsHtml,
'<h2>Try these questions</h2>',
qaHtml,
'<h2>Related learning pages</h2><ul>' + relatedHtml + '</ul>',
'<footer class="seo-foot">Free, ad-free Class 1 learning aligned with CBSE 2026\u201327 (Mridang \u2022 Joyful Mathematics \u2022 Sarangi). No account needed; progress is stored only on this device.</footer>',
'</div>',
scripts.join('\n'),
'</body></html>'].join('\n');
}

let count = 0;
for (const p of pages) {
  if (p.route === '/') continue;
  const dir = path.join(DIST, p.route.replace(/^\/|\/$/g, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(p));
  count++;
}

const homeP = pages.find(p => p.route === '/');
let updated = shell
  .replace(/<title>[^<]*<\/title>/, '<title>' + esc(homeP.title) + '</title>')
  .replace(/<meta name="viewport"[^>]*>/, '$&\n<meta name="description" content="' + esc(homeP.description) + '" />\n<link rel="canonical" href="' + ORIGIN + '/" />\n<meta name="robots" content="index, follow" />\n<meta property="og:type" content="website" /><meta property="og:title" content="' + esc(homeP.title) + '" /><meta property="og:description" content="' + esc(homeP.description) + '" /><meta property="og:url" content="' + ORIGIN + '/" /><meta property="og:image" content="' + ORIGIN + '/og-cover.png" /><meta name="twitter:card" content="summary_large_image" /><meta name="theme-color" content="#7c3aed" />\n<script type="application/ld+json">' + JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Nitya Class 1 Learning Buddy', url: ORIGIN + '/' }) + '</scr' + 'ipt>');
if (updated === shell) { console.error('WARN: shell meta replacement did not match'); }
fs.writeFileSync(path.join(DIST, 'index.html'), updated);

const routes = pages.map(p => p.route);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.map(r => '  <url><loc>' + ORIGIN + r + '</loc><changefreq>monthly</changefreq><priority>' + (r === '/' ? '1.0' : '0.8') + '</priority></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + ORIGIN + '/sitemap.xml\n');

console.log('Prerendered ' + count + ' SEO landing pages; enriched SPA shell; wrote sitemap.xml + robots.txt');
