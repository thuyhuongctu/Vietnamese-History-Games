/* Dựng ba tệp PNG trong icons/ từ hai tệp SVG gốc cạnh chúng.
   Chạy:  node tools/dung-bieu-tuong.mjs
   Playwright ở Node, không ở Python; xem CLAUDE.md của kho trang cá nhân. */
import pw from '/opt/node-tools/node_modules/playwright/index.js';
import fs from 'fs';
import path from 'path';
const { chromium } = pw;
const goc = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const viec = [
  ['icon.svg',          192, 'icon-192.png'],
  ['icon.svg',          512, 'icon-512.png'],
  ['icon-maskable.svg', 512, 'icon-maskable-512.png'],
];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium',
  args: ['--enable-unsafe-swiftshader', '--use-gl=swiftshader'] });
for (const [nguon, co, dich] of viec) {
  const svg = fs.readFileSync(path.join(goc, 'icons', nguon), 'utf8');
  const pg = await b.newPage({ viewport: { width: co, height: co }, deviceScaleFactor: 1 });
  await pg.goto('data:text/html;charset=utf-8,' + encodeURIComponent(
    `<meta charset="utf-8"><style>html,body{margin:0}svg{display:block;width:${co}px;height:${co}px}</style>` + svg));
  await pg.waitForTimeout(200);
  await pg.screenshot({ path: path.join(goc, 'icons', dich) });
  await pg.close();
  console.log(dich, co + 'px');
}
await b.close();
