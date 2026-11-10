const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'assets/js/portfolio-details.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const titles = ['App 1', 'Web 3', 'App 2', 'Card 2', 'Web 2', 'App 3', 'Card 1', 'Card 3', 'Web 3'];
const data = fs.readFileSync(path.join(root, 'assets/js/portfolio-data.js'), 'utf8');
function render(search, projectUrl) {
  const elements = {};
  const node = () => ({ children: [], appendChild(child) { this.children.push(child); } });
  const document = { querySelector: selector => elements[selector] ||= node(), createElement: node };
  const context = { document, window: { location: { search } }, URLSearchParams, URL };
  vm.runInNewContext(data, context);
  if (projectUrl !== undefined) context.window.portfolioProjects['1'].url = projectUrl;
  vm.runInNewContext(script, context);
  return { elements, document };
}
titles.forEach((title, i) => {
  const id = i + 1;
  assert.ok(index.includes(`href="portfolio-details.html?id=${id}"`));
  const { elements } = render(`?id=${id}`);
  assert.equal(elements['#project-title'].textContent, title);
  assert.equal(elements['#project-category'].textContent, title.split(' ')[0]);
  const images = elements['#project-images'].children.map(slide => slide.children[0]);
  assert.equal(images.length, 3);
  assert.equal(images[0].src, `assets/img/portfolio/portfolio-${id}.jpg`);
  images.forEach(image => assert.ok(fs.existsSync(path.join(root, image.src))));
  assert.equal(elements['#project-client'].textContent, 'ASU Company');
  assert.equal(elements['#project-date'].textContent, '01 March, 2020');
  assert.equal(elements['#project-url'].href, 'https://www.example.com/');
  assert.ok(elements['#project-description'].textContent.length > 0);
});
assert.equal(render('').elements['#project-title'].textContent, 'App 1');
for (const id of ['0', '10', '-1', '1.5', '__proto__', '<script>']) {
  const { elements } = render('?id=' + encodeURIComponent(id));
  assert.equal(elements['.portfolio-details-slider'].hidden, true);
  assert.equal(elements['.portfolio-info'].hidden, true);
}
console.log('Passed: 9 portfolio details, default selection, and invalid IDs.');

for (const url of ['javascript:alert(1)', '', 'invalid url']) {
  assert.equal(render('?id=1', url).elements['#project-url'].href, undefined);
}
