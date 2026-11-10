(function () {
  "use strict";

  const id = new URLSearchParams(window.location.search).get('id') || '1';
  const projects = window.portfolioProjects;
  const project = Object.hasOwn(projects, id) ? projects[id] : null;

  if (!project) {
    document.title = 'Portofolio tidak ditemukan';
    document.querySelector('#project-title').textContent = 'Portofolio tidak ditemukan';
    document.querySelector('#project-description').textContent = 'Silakan kembali dan pilih portofolio dari daftar.';
    document.querySelector('.portfolio-details-slider').hidden = true;
    document.querySelector('.portfolio-info').hidden = true;
    return;
  }

  document.title = project.title + ' - Portfolio Details';
  document.querySelector('#project-title').textContent = project.title;
  document.querySelector('#project-category').textContent = project.category;
  document.querySelector('#project-description').textContent = project.description;
  const link = document.querySelector('#project-url');
  link.textContent = project.url;
  try {
    const url = new URL(project.url);
    if (['https:', 'http:'].includes(url.protocol)) link.href = url.href;
  } catch {
    // URL kosong atau belum lengkap tetap ditampilkan sebagai teks.
  }
  const gallery = document.querySelector('#project-images');
  project.images.forEach((src) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    const image = document.createElement('img');
    image.src = src;
    image.alt = project.title;
    slide.appendChild(image);
    gallery.appendChild(slide);
  });
})();
