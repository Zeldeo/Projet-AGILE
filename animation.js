  const carousel = document.getElementById('carousel');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');

  // défilement avec les flèches
  next.addEventListener('click', () => {
    carousel.scrollBy({ left: 320, behavior: 'smooth' });
  });

  prev.addEventListener('click', () => {
    carousel.scrollBy({ left: -320, behavior: 'smooth' });
  });

  // défilement automatique (toutes les 4 secondes)
  setInterval(() => {
    carousel.scrollBy({ left: 320, behavior: 'smooth' });
    // revient au début si fin atteinte
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, 4000);



function submitForm(event) {
  event.preventDefault();
  alert('Merci pour votre message ! Nous vous répondrons sous peu.');
  event.target.reset();
}