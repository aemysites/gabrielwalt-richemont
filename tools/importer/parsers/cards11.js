/* global WebImporter */
export default function parse(element, { document }) {
  // Only process if element is a card list
  if (!element || !element.classList.contains('latest-articles-block__cards-list')) return;

  // Table header row
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Get all visible cards (ignore those with display:none)
  const cards = Array.from(element.children).filter(card => {
    if (!card.classList.contains('latest-article-card')) return false;
    const style = card.getAttribute('style');
    if (style && /display\s*:\s*none/.test(style)) return false;
    return true;
  });

  cards.forEach(card => {
    // Image cell
    const img = card.querySelector('img');
    if (!img) return;

    // Text cell
    const cardBody = card.querySelector('.card-body');
    if (!cardBody) return;

    // Compose text cell: include all content from cardBody
    // Clone the cardBody so we don't move elements from the DOM
    const textCell = cardBody.cloneNode(true);

    // Each row: [image, text content]
    rows.push([img, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
