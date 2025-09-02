/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element
  function extractCard(cardElem) {
    // Find image
    const img = cardElem.querySelector('img');
    // Find title
    const title = cardElem.querySelector('.card-title, h2, h3, h4, h5, h6');
    // Find description
    const desc = cardElem.querySelector('.history-card-block__text, p');
    // Find CTA link (if present)
    const footer = cardElem.querySelector('.card-footer');
    let cta = null;
    if (footer) {
      cta = footer.querySelector('a');
    }
    // Compose text cell
    const textParts = [];
    if (title) textParts.push(title);
    if (desc) textParts.push(desc);
    if (cta) textParts.push(cta);
    return [img, textParts];
  }

  // Find all card elements in the block
  // Defensive: cards are inside .umb-block-grid__area > ... > .history-card-block
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  const rows = [];
  areaContainers.forEach(area => {
    const card = area.querySelector('.history-card-block');
    if (card) {
      rows.push(extractCard(card));
    }
  });

  // Table header
  const headerRow = ['Cards (cards9)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
