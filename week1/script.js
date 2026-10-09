const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const searchInput = document.querySelector('#campus-search');
const searchableCards = document.querySelectorAll('[data-searchable]');
const searchButton = document.querySelector('.search-form button');

const filterCampusContent = (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  searchableCards.forEach((card) => {
    const searchableText = card.dataset.searchable.toLowerCase();
    card.hidden = normalizedQuery.length > 0 && !searchableText.includes(normalizedQuery);
  });
};

searchInput?.addEventListener('input', (event) => filterCampusContent(event.target.value));
searchButton?.addEventListener('click', () => {
  filterCampusContent(searchInput?.value || '');
  document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
  });
});

const notificationButton = document.querySelector('.notification-button');
const notificationPanel = document.querySelector('.notification-panel');

notificationButton?.addEventListener('click', () => {
  const isOpen = notificationPanel.hidden;
  notificationPanel.hidden = !isOpen;
  notificationButton.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.notification-wrap')) {
    notificationPanel.hidden = true;
    notificationButton?.setAttribute('aria-expanded', 'false');
  }
});
