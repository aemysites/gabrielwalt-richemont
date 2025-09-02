/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block section
  const cardsSection = element.querySelector('.document-cards-block');
  if (!cardsSection) return;

  // Find all card elements
  const cardEls = cardsSection.querySelectorAll('.document-card-block');
  if (!cardEls.length) return;

  // Table header row (block name and variant)
  const headerRow = ['Cards (cardsNoImages30)'];
  const rows = [headerRow];

  // For each card, create a row with heading and CTA link
  cardEls.forEach(cardEl => {
    // Defensive: find card title
    const titleEl = cardEl.querySelector('.card-title');
    // Defensive: find download link
    const linkEl = cardEl.querySelector('.card-footer a');

    // Compose cell content
    const cellContent = [];
    if (titleEl) {
      cellContent.push(titleEl);
    }
    if (linkEl) {
      // Place link below title
      cellContent.push(document.createElement('br'));
      cellContent.push(linkEl);
    }
    rows.push([cellContent]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
