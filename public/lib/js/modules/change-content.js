export default function initChangeContent(sectionName) {
  const content = document.querySelector('.content');
  const sections = content.querySelectorAll('section');

  sections.forEach((section) => {
    if (section.classList.contains('active')) {
      section.classList.remove('active');
    } else if (section.classList.contains(sectionName)) {
      section.classList.add('active');
    }
  });
}