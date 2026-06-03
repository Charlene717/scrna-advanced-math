/* scRNA-seq 進階數學教程 — 語言切換器
 * 中文 zh-Hant 與英文 en 雙語
 */
(function () {
  var KEY = 'scrna-math-lang';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  var initial = stored || 'zh';

  function getBtnLang(b) {
    // 支援 data-lang-btn (M3 頁面) 或 data-lang (備援)
    return b.dataset.langBtn || b.dataset.lang;
  }

  function apply(lang) {
    if (lang === 'en') {
      document.body.classList.add('lang-en');
    } else {
      document.body.classList.remove('lang-en');
    }
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-Hant';
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.classList.toggle('active', getBtnLang(b) === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    window.__LANG__ = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(initial);
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.addEventListener('click', function () { apply(getBtnLang(b)); });
    });

    // === 下拉式選單：點擊切換 (相容觸控/桌面) ===
    document.querySelectorAll('.top-nav-links li.dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var li = link.parentElement;
        var isOpen = li.classList.contains('open');
        // 關閉所有其他下拉
        document.querySelectorAll('.top-nav-links li.dropdown.open').forEach(function (d) {
          if (d !== li) d.classList.remove('open');
        });
        // 觸控裝置：點擊主標題只切換、不跳轉
        var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch && !isOpen) {
          e.preventDefault();
          li.classList.add('open');
        } else if (isOpen) {
          // 已展開時點擊主標題就直接跳轉到對應模塊
          li.classList.remove('open');
        }
      });
    });
    // 點擊外部關閉
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.top-nav-links')) {
        document.querySelectorAll('.top-nav-links li.dropdown.open').forEach(function (d) {
          d.classList.remove('open');
        });
      }
    });
  });

  window.I18n = {
    get: function () { return window.__LANG__ || initial; },
    set: apply
  };
})();
