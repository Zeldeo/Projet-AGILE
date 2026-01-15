AOS.init();

function submitForm(event) {
  event.preventDefault();
  alert('Merci pour votre message ! Nous vous répondrons sous peu.');
  event.target.reset();
}