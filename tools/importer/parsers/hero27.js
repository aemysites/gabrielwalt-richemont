/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero27)'];

  // Defensive: Find the hero block container
  const heroBlock = element.querySelector('.hero-block');
  if (!heroBlock) return;

  // --- Row 2: Background asset (video) ---
  // Find the first video element (mobile or desktop)
  let videoEl = heroBlock.querySelector('video');
  let bgCell = '';
  if (videoEl) {
    // Find the <source> inside video
    const source = videoEl.querySelector('source');
    if (source && source.src) {
      // Create a link to the video asset
      const videoLink = document.createElement('a');
      videoLink.href = source.src;
      videoLink.textContent = source.src.split('/').pop();
      bgCell = videoLink;
    } else {
      // If no source, include the video element itself
      bgCell = videoEl;
    }
  }

  // --- Row 3: Headline and all text content ---
  // Collect all text content from heroBlock (not just h1)
  // We'll include the h1 and any other visible text nodes
  const textFragments = [];
  // Get h1
  const heading = heroBlock.querySelector('h1');
  if (heading) {
    textFragments.push(heading.cloneNode(true));
  }
  // Get any other text nodes (e.g., paragraph, span, etc.)
  heroBlock.querySelectorAll('p, span, .hero-block__subtitle, .hero-block__cta').forEach(el => {
    if (el.textContent.trim()) {
      textFragments.push(el.cloneNode(true));
    }
  });
  // If no extra elements, fallback to just heading
  let textCell = textFragments.length ? textFragments : '';

  // Compose table rows
  const rows = [
    headerRow,
    [bgCell],
    [textCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
