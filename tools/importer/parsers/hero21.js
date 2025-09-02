/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero banner block root
  const heroBlock = element.querySelector('.hero-banner-block');
  if (!heroBlock) return;

  // --- Row 2: Background image (optional) ---
  // Find the background image (should be the first img with class 'hero-banner-block__background')
  const bgImg = heroBlock.querySelector('img.hero-banner-block__background');
  let bgImgEl = null;
  if (bgImg) {
    bgImgEl = bgImg;
  }

  // --- Row 3: Title, Subheading, CTA ---
  // Find the text container
  const textContainer = heroBlock.querySelector('.hero-banner-block__text');
  let contentFragment = document.createDocumentFragment();
  if (textContainer) {
    // Get all children (should include the title)
    Array.from(textContainer.childNodes).forEach((node) => {
      contentFragment.appendChild(node.cloneNode(true));
    });
  }
  // Optionally, add CTA if present
  const anchorLink = heroBlock.querySelector('.hero-banner-block__anchor-link');
  if (anchorLink) {
    contentFragment.appendChild(anchorLink.cloneNode(true));
  }

  // Compose the table rows
  const headerRow = ['Hero (hero21)'];
  const bgImgRow = [bgImgEl ? bgImgEl : ''];
  const contentRow = [contentFragment];

  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
