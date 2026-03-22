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

  // Attach click handlers to all video cards
  var cards = document.querySelectorAll('.video-card');
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
