/* scRNA-seq 進階數學教程 — 語言切換器
 * 中文 zh-Hant 與英文 en 雙語
 */
(function () {
  var KEY = 'scrna-math-lang';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  var initial = stored || 'zh';

  function apply(lang) {
    if (lang === 'en') {
      document.body.classList.add('lang-en');
    } else {
      document.body.classList.remove('lang-en');
    }
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-Hant';
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    window.__LANG__ = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(initial);
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.lang); });
    });
  });

  window.I18n = {
    get: function () { return window.__LANG__ || initial; },
    set: apply
  };
})();
