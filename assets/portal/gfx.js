/* Chế độ đồ hoạ cho game 3D: «Đẹp» (khử răng cưa, độ phân giải cao) hoặc «Nhẹ» (cho máy yếu).
   Lưu trong localStorage «thd-gfx»; có thể ép bằng ?gfx=nhe hoặc ?gfx=dep.
   Lần đầu: máy ít RAM (≤ 2 GB) hoặc ít nhân (≤ 2) tự chọn «Nhẹ». */
(function () {
  var K = 'thd-gfx', v = null, q = null;
  try { q = new URLSearchParams(location.search).get('gfx'); } catch (e) {}
  try {
    if (q === 'nhe' || q === 'dep') localStorage.setItem(K, q);
    v = localStorage.getItem(K);
  } catch (e) { if (q === 'nhe' || q === 'dep') v = q; }
  var auto = false;
  if (v !== 'nhe' && v !== 'dep') {
    var low = (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
              (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
    v = low ? 'nhe' : 'dep'; auto = true;
  }
  var nhe = v === 'nhe';
  window.THD_GFX = {
    nhe: nhe, auto: auto,
    aa: !nhe,
    ratio: nhe ? 1 : Math.min(window.devicePixelRatio || 1, 2),
    set: function (m) { try { localStorage.setItem(K, m); } catch (e) {} location.reload(); }
  };
  function gan() {
    var bs = document.querySelectorAll('[data-gfx-toggle]');
    for (var i = 0; i < bs.length; i++) (function (b) {
      b.textContent = '🎛️ Đồ hoạ: ' + (nhe ? 'Nhẹ' : 'Đẹp');
      b.setAttribute('aria-pressed', nhe ? 'true' : 'false');
      b.title = nhe ? 'Đang dùng đồ hoạ nhẹ cho máy yếu. Bấm để chuyển sang đồ hoạ đẹp (tải lại trang).'
                    : 'Bấm để chuyển sang đồ hoạ nhẹ cho máy yếu (tải lại trang).';
      b.addEventListener('click', function () { window.THD_GFX.set(nhe ? 'dep' : 'nhe'); });
    })(bs[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', gan); else gan();
})();
