/* global WebImporter */
export default function parse(element, { document }) {
  // Get all visible cards only
  const cards = Array.from(element.querySelectorAll(':scope > .manually-pick-item-card'))
    .filter(card => card.style.display !== 'none');

  const rows = [];
  // Block header row as required
  rows.push(['Cards (cards13)']);

  cards.forEach(card => {
    // Image: use the actual <img> element
    const img = card.querySelector('img');
    // Card body
    const cardBody = card.querySelector('.card-body');
    if (!img || !cardBody) return; // Defensive: skip if missing
    // Compose text cell: include all text content from card body
    const textCell = [];
    // Add all children of cardBody (not just title/desc)
    Array.from(cardBody.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
        textCell.push(node.cloneNode(true));
      }
    });
    rows.push([
      img,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
