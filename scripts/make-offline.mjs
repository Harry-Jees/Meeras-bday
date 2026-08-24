import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const assets = new URL('./assets/', dist);
const names = await readdir(assets);
const js = names.find((name) => name.endsWith('.js'));
const css = names.find((name) => name.endsWith('.css'));
if (!js || !css) throw new Error('Build assets were not found.');

const [script, styles] = await Promise.all([
  readFile(new URL(`./assets/${js}`, dist), 'utf8'),
  readFile(new URL(`./assets/${css}`, dist), 'utf8'),
]);

const imageDir = new URL('../public/images/', import.meta.url);
const imageNames = await readdir(imageDir);
let inlineScript = script;
for (const imageName of imageNames) {
  const bytes = await readFile(new URL(`./${imageName}`, imageDir));
  const dataUrl = `data:image/jpeg;base64,${bytes.toString('base64')}`;
  inlineScript = inlineScript.replaceAll(`/images/${imageName}`, dataUrl);
}

// This file deliberately has no external local asset requests, so Chrome can open it via file://.
const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#16111b"><title>Meechu — 17</title>
<style>${styles}</style></head><body><div id="root"></div><script>${inlineScript}</script></body></html>`;
await writeFile(new URL('../Meechu-17-offline.html', import.meta.url), html, 'utf8');
console.log('Created Meechu-17-offline.html');
