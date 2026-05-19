// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  var newsGrid = document.querySelector('.news-grid');
  if (newsGrid) {
    var entries = Array.prototype.slice.call(newsGrid.querySelectorAll(':scope > .news-entry'));
    var twoColumnQuery = window.matchMedia('(min-width: 769px)');

    function renderNewsEntries() {
      var fragment = document.createDocumentFragment();
      var columns;
      var columnIndex = 0;

      function createColumns() {
        columns = document.createElement('div');
        columns.className = 'news-columns';

        var left = document.createElement('div');
        left.className = 'news-column';

        var right = document.createElement('div');
        right.className = 'news-column';

        columns.appendChild(left);
        columns.appendChild(right);
        columnIndex = 0;
      }

      function appendColumns() {
        if (columns && (columns.children[0].children.length || columns.children[1].children.length)) {
          fragment.appendChild(columns);
        }
      }

      if (!twoColumnQuery.matches) {
        entries.forEach(function(entry) {
          fragment.appendChild(entry);
        });
        newsGrid.innerHTML = '';
        newsGrid.appendChild(fragment);
        return;
      }

      createColumns();

      entries.forEach(function(entry) {
        if (entry.classList.contains('news-entry-wide')) {
          appendColumns();
          fragment.appendChild(entry);
          createColumns();
          return;
        }

        columns.children[columnIndex % 2].appendChild(entry);
        columnIndex += 1;
      });

      appendColumns();
      newsGrid.innerHTML = '';
      newsGrid.appendChild(fragment);
    }

    if (entries.length) {
      renderNewsEntries();

      if (twoColumnQuery.addEventListener) {
        twoColumnQuery.addEventListener('change', renderNewsEntries);
      } else if (twoColumnQuery.addListener) {
        twoColumnQuery.addListener(renderNewsEntries);
      }
    }
  }

  // Video thumbnail grid — click to play in modal
  var modal = document.getElementById('videoModal');
  if (!modal) return;

  var backdrop = modal.querySelector('.video-modal-backdrop');
  var closeBtn = modal.querySelector('.video-modal-close');
  var player = modal.querySelector('.video-modal-player');

  function openVideo(card) {
    var type = card.dataset.type;
    var id = card.dataset.id;
    var start = card.dataset.start;
    var src = card.dataset.src;
    var iframe;

    if (type === 'youtube') {
      var url = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
      if (start) url += '&start=' + start;
      iframe = '<iframe src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    } else if (type === 'vimeo') {
      iframe = '<iframe src="https://player.vimeo.com/video/' + id + '?autoplay=1&dnt=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    } else if (type === 'self-hosted') {
      iframe = '<video controls autoplay style="width:100%;height:100%;position:absolute;top:0;left:0"><source src="' + src + '" type="video/quicktime">Your browser does not support this video.</video>';
    }

    player.innerHTML = iframe;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    modal.classList.remove('active');
    player.innerHTML = '';
    document.body.style.overflow = '';
  }

  // Attach handlers to cards that open the in-page video modal.
  var cards = document.querySelectorAll('.video-card[data-type]');
  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      openVideo(card);
    });
  });

  // Close modal
  if (backdrop) backdrop.addEventListener('click', closeVideo);
  if (closeBtn) closeBtn.addEventListener('click', closeVideo);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideo();
  });
});
