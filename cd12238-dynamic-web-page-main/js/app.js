function generateNavigation() {
  const sections = document.querySelectorAll('section');
  const navList = document.getElementById('navbar__list');

  sections.forEach((section) => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.textContent = section.getAttribute('data-nav');
    navLink.classList.add('menu__link');
    navLink.href = `#${section.id}`;
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });
    sections.forEach((section) => {
      section.classList.remove('active');
      const navLink = navList.querySelector(`[href="#${section.id}"]`);
      navLink.classList.remove('active');
    });

    const activeSection = document.getElementById(current);
    const activeNavLink = navList.querySelector(`[href="#${current}"]`);

    if (activeSection) {
      activeSection.classList.add('active');
    }
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const commentList = document.getElementById('commentList');

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <p><span class="comment-author">${name}</span> | <span class="comment-date">${getCurrentDate()}</span></p>
      <p>${comment}</p>
    `;
    commentList.appendChild(commentElement);
    commentForm.reset();
  });
  function getCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  }
});
generateNavigation();
