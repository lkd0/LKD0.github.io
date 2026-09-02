/* ================================================================
   作品集交互脚本 — 一共只干三件事:
   1. 滚动渐显(Io)  2. 技能条入场动画  3. whoami 打字机
   ================================================================ */
'use strict'; // 严格模式:少一些历史包袱的报错方式,老代码习惯但值得养

/* ---------- 0. 尊重用户设置 ----------
   系统开了"减弱动态效果",就别放动画。和 CSS 里那条媒体查询是一对搭档 */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1 & 2. 滚动渐显 + 技能条 ----------
   面试核心考点:"为什么用 IntersectionObserver 而不是监听 scroll 事件?"
   —— scroll 每秒触发几百次且每次都要手动算位置;Io 由浏览器底层异步调度,
   元素"进出视口"这个事件直接回调给你,又快又准 */

// 需要入场动画的元素清单(选择器字符串,和 CSS 写法一模一样——querySelectorAll 的通用性)
const revealTargets = document.querySelectorAll(
  '.hero__eyebrow, .hero__title, .hero__sub, .hero__meta, .hero__cta, ' +
  '.section__title, .about__text, .about__facts, .card, .skill, ' +
  '.contact__lead, .contact__links'
);

// 挨个标记"待入场",并用序号算错峰延迟(同类的第 n 个,晚 n*90ms 出场)
revealTargets.forEach((el) => {
  el.classList.add('js-reveal');
  // closest('.section, .hero, .projects') 找到"同组容器",组内重新计数
  const group = el.closest('.section, .hero') || document.body;
  const indexInGroup = [...group.querySelectorAll('.js-reveal')].indexOf(el);
  el.style.setProperty('--stagger', indexInGroup % 4); // 每组最多错开 3 档,避免尾部等太久
});

if (reducedMotion) {
  // 无动画偏好:直接全部显示、技能条一步到位,不走观察器
  revealTargets.forEach((el) => {
    el.classList.add('is-in');
    if (el.dataset.level) el.style.setProperty('--level', el.dataset.level + '%');
  });
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return; // 没进视口,什么都不做

      entry.target.classList.add('is-in'); // 触发 CSS 过渡

      /* 技能条专属:读 HTML 的 data-level,动态注入 --level
         —— 上集 CSS 里写死的 6 条规则,在这里"还"给 JS 了:
         el.dataset.level 就是 data-level="80" 的值(字符串"80")
         以后 HTML 里改成 data-level="95",这里零改动自动生效 */
      if (entry.target.dataset.level) {
        entry.target.style.setProperty('--level', entry.target.dataset.level + '%');
      }

      observer.unobserve(entry.target); // 入场一次就够,不再观察 → 性能回收
    });
  }, { threshold: 0.15 }); // 元素露出 15% 算"进入视口",0 会太敏感

  revealTargets.forEach((el) => observer.observe(el));
}

/* ---------- 3. whoami 打字机 ----------
   终端文化:whoami 命令输出当前用户名 → 打出你的名字,呼应设计师身份 */
const output = document.getElementById('whoami-output');
// 数据源不写死在 JS 里,而是从 <title> 提取——改名字时只改 HTML 一处。
// 面试常考:"这段代码如果要复用给下一个人,哪些地方最容易改错?" 硬编码就是首恶
const myName = document.title.split('—')[0].trim(); // "李凯迪 — 前端开发求职者" → "李凯迪"

function typeWriter(text, el, speed = 120) {
  if (!el) return;
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];  // 一次加一个字符
    i += 1;
    if (i >= text.length) clearInterval(timer); // 打完就清定时器,防止内存泄漏
  }, speed);
}

// 页面加载后稍等 600ms 再开打,让眼睛先适应布局
if (!reducedMotion) {
  setTimeout(() => typeWriter(' > ' + myName, output), 600);
} else {
  output.textContent = ' > ' + myName; // 直接给结果
}

/* ---------- 4. 页脚年份自动更新(两行的小知识点) ----------
   new Date().getFullYear():让明年不用回来手改 © 2026 */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
