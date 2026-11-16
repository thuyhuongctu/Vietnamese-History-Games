/* ThuyHuong Digital — service worker
   Cache-first cho toàn bộ cổng game: cài một lần, chơi ngoại tuyến. */
'use strict';
const VERSION = 'thd-v54';
const SHELL = [
  './',
  './index.html',
  './assets/nhac/anh-viet-thu-phap.webp',
  './assets/nhac/anh-chuong-ban-do.webp',
  './assets/nhac/anh-them-rong.webp',
  './assets/nhac/anh-bat-sen.webp',
  './assets/nhac/anh-khung-cua.webp',
  './assets/nhac/anh-hanh-lang.webp',
  './assets/nhac/anh-san-dinh.webp',
  './huong-dan-giao-vien.html',
  './phan-tu.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './assets/portal/van-don.webp',
  './assets/portal/bia-van-don.webp',
  './assets/portal/bia-bac-hai-dao.webp',
  './assets/portal/van-don-3d.webp',
  './assets/portal/bac-hai-dao.webp',
  './assets/portal/bac-hai-dao-3d.webp',
  './assets/portal/cho-noi.webp',
  './bac-hai-dao/assets/nhac/bac-hai-dao-bia.jpg',
  './van-don/index.html',
  './van-don/gioi-thieu.html',
  './assets/portal/gioi-thieu.css',
  './assets/portal/site.css',
  './assets/portal/site.js',
  './assets/portal/gfx.js',
  './assets/portal/gallery.js',
  './assets/nhac/nguoi-trao-ta-chan-troi.webp',
  './assets/nhac/trong-toi-co-mot-nuoc-nam.webp',
  './assets/portal/van-don-cho-dem.webp',
  './van-don-3d/index.html',
  './bac-hai-dao/index.html',
  './bac-hai-dao/gioi-thieu.html',
  './assets/portal/bac-hai-dao-captains.webp',
  './bac-hai-dao-3d/index.html',
  './cho-noi/index.html',
  './cho-noi/gioi-thieu.html',
  './assets/vendor/phaser.min.js',
  './lib/three.min.js',
  './bac-hai-dao/assets/do-doc-phuong-hoa-v2.jpg',
  './bac-hai-dao/assets/do-doc-phuong-hoa-chibi.jpg',
  './bac-hai-dao/assets/lai-buon-tran-van-don-v2.jpg',
  './bac-hai-dao/assets/kiem-khach-hai-au-v2.jpg',
  './bac-hai-dao/assets/ba-tu-cat-hai-v2.jpg',
  './bac-hai-dao/assets/mat-do-doc-phuong-hoa.jpg',
  './bac-hai-dao/assets/mat-lai-buon-tran-van-don.jpg',
  './bac-hai-dao/assets/mat-kiem-khach-hai-au.jpg',
  './bac-hai-dao/assets/mat-ba-tu-cat-hai.jpg',
  './van-don-3d/assets/ben-cang-van-don.jpg',
  './van-don-3d/assets/tho-ca-lo-gom.jpg',
  './van-don-3d/assets/thuong-nhan-trao-oa-v2.jpg',
  './van-don-3d/assets/thuong-nhan-tam-phat-te-v2.jpg',
  './van-don-3d/assets/quan-tran-thu-v2.jpg',
  './van-don-3d/assets/nu-thuong-chu-v2.jpg',
  './van-don-3d/assets/ba-chu-xuong-lua-v2.jpg',
  './van-don-3d/assets/chu-tram-huong-v2.jpg',
  './van-don-3d/assets/tho-lan-ngoc-trai-v2.jpg',
  './van-don-3d/assets/thu-lai-thue-quan-v2.jpg',
  './van-don-3d/assets/thuong-nhan-tong-v2.jpg',
  './van-don-3d/assets/thuong-nhan-xiem-la-v2.jpg',
  './van-don-3d/assets/ben-dem.jpg',
  './van-don-3d/assets/cho-dem.jpg',
  './van-don-3d/assets/ben-hoang-hon.jpg',
  './van-don-3d/assets/tuong/quan-tran-thu-v2.than.webp',
  './van-don-3d/assets/tuong/quan-tran-thu-v2.chanT.webp',
  './van-don-3d/assets/tuong/quan-tran-thu-v2.chanP.webp',
  './van-don-3d/assets/tuong/nu-thuong-chu-v2.than.webp',
  './van-don-3d/assets/tuong/nu-thuong-chu-v2.chanT.webp',
  './van-don-3d/assets/tuong/nu-thuong-chu-v2.chanP.webp',
  './van-don-3d/assets/tuong/tho-ca-lo-gom.webp',
  './van-don-3d/assets/tuong/ba-chu-xuong-lua-v2.webp',
  './van-don-3d/assets/tuong/chu-tram-huong-v2.webp',
  './van-don-3d/assets/tuong/tho-lan-ngoc-trai-v2.webp',
  './van-don-3d/assets/tuong/thu-lai-thue-quan-v2.webp',
  './van-don-3d/assets/tuong/thuong-nhan-tong-v2.webp',
  './van-don-3d/assets/tuong/thuong-nhan-xiem-la-v2.webp',
  './van-don-3d/assets/tuong/thuong-nhan-trao-oa-v2.webp',
  './van-don-3d/assets/tuong/thuong-nhan-tam-phat-te-v2.webp',
  './van-don-3d/assets/tuong/su-than.webp',
  './van-don-3d/assets/su-than.jpg',
  './van-don-3d/assets/su-than-mat.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      // addAll từng cái một để 1 file lỗi (vd ảnh đổi tên) không phá cả bản cài
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;   // không đụng tài nguyên ngoài
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
      // cache-first, đồng thời tải bản mới về cập nhật cho lần sau
      const fresh = fetch(e.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(VERSION).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
