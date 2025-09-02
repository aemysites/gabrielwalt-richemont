/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card data from each area
  function extractCard(area) {
    // Get all direct layout items in this area
    const items = Array.from(area.querySelectorAll(':scope > .umb-block-grid__layout-container > .umb-block-grid__layout-item'));
    let imgEl = null;
    let textEls = [];
    let quoteEl = null;
    items.forEach(item => {
      if (item.querySelector('.image-block')) {
        // Image block
        imgEl = item.querySelector('img');
      } else if (item.querySelector('.richtext-block')) {
        // Rich text block (name/title)
        const rich = item.querySelector('.richtext-block');
        // Collect all children (name and title)
        textEls = Array.from(rich.children);
      } else if (item.querySelector('.history-card-block')) {
        // History card block (quote)
        const quote = item.querySelector('.history-card-block__text');
        if (quote) quoteEl = quote;
      }
    });
    // Compose text cell: name/title + quote
    const textCell = [...textEls];
    if (quoteEl) textCell.push(quoteEl);
    return [imgEl, textCell];
  }

  // Find all three card areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  const rows = [];
  const headerRow = ['Cards (cards33)'];
  rows.push(headerRow);
  areaContainers.forEach(area => {
    const cardCells = extractCard(area);
    rows.push(cardCells);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
