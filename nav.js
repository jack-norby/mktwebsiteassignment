/* ============================================================
   nav.js — renders every shared region of the page layout.

   The layout follows the "Web Page Area" diagram from Web
   Development 1. Each HTML file supplies only its own main
   content; this script builds the rest:

     Logo (top-left)        | Informational graphics
     ---------------------------------------------------
     Primary navigation
     Secondary navigation
     ---------------------------------------------------
     Primary nav   |  Hero image      |  Sticky content
     Secondary nav |  Main content    |  - news items
                   |                  |  - offers
                   |                  |  - site info
                   |                  |  - social icons
     ---------------------------------------------------
     Footer: copyright, year, primary links, contact,
             privacy statement, webmaster email

   Conventions applied: global navigation is identical on all
   four pages, the logo links home from everywhere, and a
   hamburger button replaces the menu on narrow screens.
   ============================================================ */
(function () {
  'use strict';

  /* Single source of truth for the global (primary) navigation. */
  var PAGES = [
    { file: 'index.html',     label: 'Home' },
    { file: 'about.html',     label: 'About' },
    { file: 'portfolio.html', label: 'Portfolio' },
    { file: 'contact.html',   label: 'Contact' }
  ];

  /* Secondary navigation — the in-page sections for each page.
     The diagram calls for it "if needed"; every page here has
     sections worth jumping to, so every page gets one. */
  var SECTIONS = {
    'index.html': [
      { id: 'what-i-do',  label: 'What I do' },
      { id: 'principles', label: 'Site principles' },
      { id: 'next-step',  label: 'Next step' }
    ],
    'about.html': [
      { id: 'education',  label: 'Education' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills',     label: 'Skills' },
      { id: 'site-design', label: 'Site design' }
    ],
    'portfolio.html': [
      { id: 'work',     label: 'The work' },
      { id: 'roles',    label: 'Roles' },
      { id: 'approach', label: 'Approach' }
    ],
    'contact.html': [
      { id: 'form',    label: 'Feedback form' },
      { id: 'reach',   label: 'Reach me' },
      { id: 'faq',     label: 'FAQ' }
    ]
  };

  var SITE = {
    name: 'Jack Norby',
    tagline: 'Marketing, Entrepreneurship & Applied AI',
    email: 'jacknorby@icloud.com',
    webmaster: 'jacknorby@icloud.com',
    location: 'Ames, Iowa'
  };

  /* Social networking icons for the sticky rail.
     Leave `url` empty and the icon renders without a link rather
     than pointing at a profile that does not exist. Fill a url in
     and it becomes a real link automatically. */
  var SOCIAL = [
    { name: 'Instagram', url: '', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.8 6a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 17.8 6z' },
    { name: 'TikTok',    url: '', path: 'M16.5 2h-3v12.2a2.6 2.6 0 1 1-2-2.5V8.6a5.9 5.9 0 1 0 5 5.8V8.9a6.4 6.4 0 0 0 3.5 1.1V7a3.6 3.6 0 0 1-3.5-3.5V2z' },
    { name: 'LinkedIn',  url: '', path: 'M4.5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3v12H3V9zm5.5 0h2.9v1.7h.05a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.65 2 3.65 4.6V21h-3v-5.8c0-1.4-.03-3.2-1.95-3.2s-2.25 1.5-2.25 3.1V21h-3V9z' },
    { name: 'Email',     url: 'mailto:' + SITE.email, path: 'M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13A2.5 2.5 0 0 1 19.5 21h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.2-.5L12 11.2 19.8 5H4.2zM4 7.3v11.2c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V7.3l-7.4 5.9a1 1 0 0 1-1.2 0L4 7.3z' }
  ];

  /* Which file are we on? A bare directory URL counts as index.html
     so both "/" and "/index.html" light up the Home link. */
  function currentFile() {
    var path = window.location.pathname;
    var last = path.substring(path.lastIndexOf('/') + 1);
    return last === '' ? 'index.html' : last;
  }

  function primaryLinks(here, cls) {
    return PAGES.map(function (page) {
      var isHere = page.file === here;
      /* aria-current both styles the active link and announces the
         current page to screen readers. */
      return '<li><a class="' + cls + '" href="./' + page.file + '"' +
             (isHere ? ' aria-current="page"' : '') + '>' + page.label + '</a></li>';
    }).join('');
  }

  function secondaryLinks(here, cls) {
    var items = SECTIONS[here] || [];
    return items.map(function (s) {
      return '<li><a class="' + cls + '" href="#' + s.id + '">' + s.label + '</a></li>';
    }).join('');
  }

  /* ---------- Header: logo, informational graphics, two nav rows ---------- */
  function headerMarkup(here) {
    var secondary = secondaryLinks(here, 'subnav__link');

    return '' +
      '<div class="shell">' +
        '<div class="header-top">' +
          '<a class="brand" href="./index.html" aria-label="' + SITE.name + ' — back to home page">' +
            '<img src="./images/logo.svg" alt="" width="40" height="40">' +
            '<span class="brand__text">' +
              '<span class="brand__name">' + SITE.name + '</span>' +
              '<span class="brand__tag">' + SITE.tagline + '</span>' +
            '</span>' +
          '</a>' +
          /* Informational graphics: describes in images what the site is about. */
          '<figure class="header-graphic">' +
            '<img src="./images/header-banner.svg"' +
                 ' alt="Four icons summarising this site: social media campaigns, team building, leadership, and hand-built web pages"' +
                 ' width="470" height="96">' +
          '</figure>' +
          '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="primary-nav">' +
            '<span class="nav__bars" aria-hidden="true"><span></span><span></span><span></span></span>' +
            '<span>Menu</span>' +
          '</button>' +
        '</div>' +

        '<nav class="nav" id="primary-nav" aria-label="Primary navigation">' +
          '<ul class="nav__list">' + primaryLinks(here, 'nav__link') + '</ul>' +
        '</nav>' +

        (secondary
          ? '<nav class="subnav" aria-label="Secondary navigation">' +
              '<ul class="subnav__list">' + secondary + '</ul>' +
            '</nav>'
          : '') +
      '</div>';
  }

  /* ---------- Left column: primary and secondary navigation ---------- */
  function sidebarMarkup(here) {
    var secondary = secondaryLinks(here, 'sidenav__link');

    return '' +
      '<div class="col-sticky">' +
      '<nav class="sidenav" aria-label="Site sections">' +
        '<h2 class="rail__head">Primary navigation</h2>' +
        '<ul class="sidenav__list">' + primaryLinks(here, 'sidenav__link') + '</ul>' +
      '</nav>' +
      (secondary
        ? '<nav class="sidenav sidenav--secondary" aria-label="On this page">' +
            '<h2 class="rail__head">On this page</h2>' +
            '<ul class="sidenav__list">' + secondary + '</ul>' +
          '</nav>'
        : '') +
      '</div>';
  }

  /* ---------- Right column: sticky content ---------- */
  function railMarkup() {
    var icons = SOCIAL.map(function (s) {
      var svg = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
                '<path d="' + s.path + '"/></svg>';
      /* No url configured yet? Render the icon without a link rather
         than shipping a dead one. */
      return s.url
        ? '<li><a class="social__link" href="' + s.url + '" aria-label="' + s.name + '">' + svg + '</a></li>'
        : '<li><span class="social__link social__link--todo" role="img" aria-label="' +
          s.name + ' (profile link not set yet)" title="' + s.name +
          ' — add the profile URL in nav.js">' + svg + '</span></li>';
    }).join('');

    return '' +
      '<div class="col-sticky col-sticky--rail">' +
      '<section class="rail__card">' +
        '<h2 class="rail__head">Latest</h2>' +
        '<ul class="rail__news">' +
          '<li><time datetime="2026-09">September 2026</time>' +
            'Back at Iowa State for the fall semester and leading a Connection Group again.</li>' +
          '<li><time datetime="2026-08">August 2026</time>' +
            'Finished the summer at Camp Timberline in Estes Park, Colorado.</li>' +
          '<li><time datetime="2026-05">May 2026</time>' +
            'Wrapped a year with UniMovers after launching their Ames market.</li>' +
        '</ul>' +
      '</section>' +

      /* The diagram's "adverts / offers" slot, used for what I am offering. */
      '<section class="rail__card rail__card--offer">' +
        '<h2 class="rail__head">Open to work</h2>' +
        '<p>Looking for a marketing internship for summer 2027.</p>' +
        '<a class="btn btn--primary btn--sm" href="./contact.html">Get in touch</a>' +
      '</section>' +

      '<section class="rail__card">' +
        '<h2 class="rail__head">Site info</h2>' +
        '<ul class="rail__info">' +
          '<li>Four pages, hand-written HTML, CSS and JavaScript</li>' +
          '<li>No framework and no page builder</li>' +
          '<li>Body text contrast 16.5:1</li>' +
          '<li>Built for Digital Marketing, Ivy College of Business</li>' +
        '</ul>' +
      '</section>' +

      '<section class="rail__card">' +
        '<h2 class="rail__head">Find me</h2>' +
        '<ul class="social">' + icons + '</ul>' +
      '</section>' +
      '</div>';
  }

  /* ---------- Footer ---------- */
  function footerMarkup(here) {
    var links = PAGES.map(function (page) {
      return '<li><a href="./' + page.file + '">' + page.label + '</a></li>';
    }).join('');

    return '' +
      '<div class="shell">' +
        '<div class="site-footer__inner">' +
          '<div>' +
            '<h2 class="rail__head">' + SITE.name + '</h2>' +
            '<p style="max-width:32ch">' + SITE.tagline + ' student at Iowa State ' +
            'University. Social media marketing, team building, and front-end work.</p>' +
          '</div>' +
          '<div>' +
            '<h2 class="rail__head">Primary links</h2>' +
            '<ul>' + links + '</ul>' +
          '</div>' +
          '<div>' +
            '<h2 class="rail__head">Contact</h2>' +
            '<ul>' +
              '<li><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></li>' +
              '<li>' + SITE.location + '</li>' +
              '<li><a href="./contact.html">Send feedback</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h2 class="rail__head">Privacy</h2>' +
            '<p style="max-width:34ch">' +
              'This site sets no cookies and runs no analytics or trackers. ' +
              'Feedback submitted through the form on the contact page goes to a ' +
              'private spreadsheet, is used only to improve this site, and is never ' +
              'shared or sold. The email field is optional.' +
            '</p>' +
          '</div>' +
        '</div>' +
        '<div class="site-footer__legal">' +
          '<p>&copy; ' + new Date().getFullYear() + ' ' + SITE.name +
          '. All rights reserved. Built for Digital Marketing, Ivy College of ' +
          'Business, Iowa State University.</p>' +
          '<p>Webmaster: <a href="mailto:' + SITE.webmaster + '">' + SITE.webmaster + '</a>' +
          ' &middot; Currently viewing: ' + here.replace('.html', '') + '</p>' +
        '</div>' +
      '</div>';
  }

  /* Wire up the hamburger: toggle the menu, keep aria-expanded honest. */
  function initToggle(header) {
    var toggle = header.querySelector('.nav__toggle');
    var nav = header.querySelector('.nav');
    if (!toggle || !nav) { return; }

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('.nav__link')) { close(); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { close(); }
    });
  }

  function render() {
    var here = currentFile();

    var header = document.querySelector('[data-site-header]');
    if (header) {
      header.className = 'site-header';
      header.innerHTML = headerMarkup(here);
      initToggle(header);
    }

    var sidebar = document.querySelector('[data-site-sidebar]');
    if (sidebar) {
      sidebar.className = 'col-left';
      sidebar.innerHTML = sidebarMarkup(here);
    }

    var rail = document.querySelector('[data-site-rail]');
    if (rail) {
      rail.className = 'col-right';
      rail.innerHTML = railMarkup();
    }

    var footer = document.querySelector('[data-site-footer]');
    if (footer) {
      footer.className = 'site-footer';
      footer.innerHTML = footerMarkup(here);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
