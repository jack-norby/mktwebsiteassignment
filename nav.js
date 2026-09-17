/* ============================================================
   nav.js — one navigation component shared by every page.
   Each HTML file only carries <div data-site-header></div> and
   <div data-site-footer></div>; this script renders the markup,
   flags the current page, and drives the mobile hamburger menu.

   Course conventions applied here:
   - Global navigation is identical on all four pages.
   - The brand logo sits top-left and links home from every page.
   - A hamburger button replaces the menu on narrow screens.
   - The current page is marked so the visitor never feels lost.
   ============================================================ */
(function () {
  'use strict';

  /* Single source of truth for the site's global navigation. */
  var PAGES = [
    { file: 'index.html',     label: 'Home' },
    { file: 'about.html',     label: 'About' },
    { file: 'portfolio.html', label: 'Portfolio' },
    { file: 'contact.html',   label: 'Contact' }
  ];

  var SITE = {
    name: 'Jack Norby',
    tagline: 'Marketing, Entrepreneurship & Applied AI',
    email: 'jacknorby@icloud.com',
    location: 'Ames, Iowa'
  };

  /* Which file are we on? Treat a bare directory URL as index.html so
     both "/" and "/index.html" light up the Home link. */
  function currentFile() {
    var path = window.location.pathname;
    var last = path.substring(path.lastIndexOf('/') + 1);
    return last === '' ? 'index.html' : last;
  }

  function navLinks(here) {
    return PAGES.map(function (page) {
      var isHere = page.file === here;
      /* aria-current does double duty: it styles the active link and
         announces the current page to screen readers. */
      return '<li><a class="nav__link" href="./' + page.file + '"' +
             (isHere ? ' aria-current="page"' : '') + '>' + page.label + '</a></li>';
    }).join('');
  }

  function headerMarkup(here) {
    return '' +
      '<div class="wrap site-header__inner">' +
        '<a class="brand" href="./index.html" aria-label="' + SITE.name + ' — back to home page">' +
          '<img src="./images/logo.svg" alt="" width="34" height="34">' +
          '<span class="brand__name">' + SITE.name + '</span>' +
        '</a>' +
        '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="primary-nav">' +
          '<span class="nav__bars" aria-hidden="true"><span></span><span></span><span></span></span>' +
          '<span>Menu</span>' +
        '</button>' +
        '<nav class="nav" id="primary-nav" aria-label="Main navigation">' +
          '<ul class="nav__list">' + navLinks(here) + '</ul>' +
        '</nav>' +
      '</div>';
  }

  function footerMarkup(here) {
    var links = PAGES.map(function (page) {
      return '<li><a href="./' + page.file + '">' + page.label + '</a></li>';
    }).join('');

    return '' +
      '<div class="wrap">' +
        '<div class="site-footer__inner">' +
          '<div>' +
            '<h4>' + SITE.name + '</h4>' +
            '<p style="max-width:32ch">' + SITE.tagline + ' student at Iowa State University. ' +
            'Social media marketing, team building, and front-end work.</p>' +
          '</div>' +
          '<div>' +
            '<h4>Site map</h4>' +
            '<ul>' + links + '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Get in touch</h4>' +
            '<ul>' +
              '<li><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></li>' +
              '<li>' + SITE.location + '</li>' +
              '<li><a href="./contact.html">Send feedback</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<p class="site-footer__legal">&copy; ' + new Date().getFullYear() + ' ' + SITE.name +
        '. Built for Digital Marketing, Ivy College of Business, Iowa State University. ' +
        'You are viewing: ' + here.replace('.html', '') + '.</p>' +
      '</div>';
  }

  /* Wire up the hamburger: toggle the menu and keep aria-expanded honest. */
  function initToggle(header) {
    var toggle = header.querySelector('.nav__toggle');
    var nav = header.querySelector('.nav');
    if (!toggle || !nav) { return; }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    /* Tapping a link or pressing Escape closes the menu again. */
    nav.addEventListener('click', function (event) {
      if (event.target.closest('.nav__link')) { close(); }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { close(); }
    });

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function render() {
    var here = currentFile();

    var header = document.querySelector('[data-site-header]');
    if (header) {
      header.className = 'site-header';
      header.innerHTML = headerMarkup(here);
      initToggle(header);
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
