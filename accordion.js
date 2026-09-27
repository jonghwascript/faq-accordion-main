document.querySelectorAll('.accordion h2').forEach((heading) => {
  const button = heading.querySelector('.accordion-trigger');
  const panel = document.getElementById(button.getAttribute('aria-controls'));

  heading.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
  });
});
