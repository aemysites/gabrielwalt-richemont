/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create the CTA link element for the card
  function extractCTA(cardFooter) {
    if (!cardFooter) return null;
    const link = cardFooter.querySelector('a');
    if (!link) return null;
    // Remove icon span for cleaner output
    const icon = link.querySelector('.icon');
    if (icon) icon.remove();
    return link;
  }

  // Get all visible card elements
  const cards = Array.from(element.children).filter(card => {
    // Only include cards that are visible (not display: none)
    return card.style.display !== 'none';
  });

  // Table header row
  const headerRow = ['Cards (cards39)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Get image (first img in card)
    const img = card.querySelector('img');

    // Get card body (title and possible description)
    const cardBody = card.querySelector('.card-body');
    let title = null;
    let description = null;
    if (cardBody) {
      title = cardBody.querySelector('h3');
      // Get all text nodes in cardBody except h3
      const descNodes = Array.from(cardBody.childNodes).filter(n => {
        return n !== title && (n.nodeType === Node.TEXT_NODE || n.nodeType === Node.ELEMENT_NODE);
      });
      // Compose description from text nodes and elements (if any)
      if (descNodes.length > 0) {
        // Only add description if it contains non-whitespace text
        const descFragment = document.createDocumentFragment();
        descNodes.forEach(n => descFragment.appendChild(n.cloneNode(true)));
        const descText = descFragment.textContent.trim();
        if (descText.length > 0) {
          description = document.createElement('div');
          descNodes.forEach(n => description.appendChild(n.cloneNode(true)));
        }
      }
    }

    // Get card footer (CTA link)
    const cardFooter = card.querySelector('.card-footer');
    const cta = extractCTA(cardFooter);

    // Compose text cell: title, description, and CTA
    const textCellContent = [];
    if (title) textCellContent.push(title);
    if (description) textCellContent.push(description);
    if (cta) textCellContent.push(cta);

    // Only add non-empty text cell
    rows.push([
      img,
      textCellContent.length === 1 ? textCellContent[0] : (textCellContent.length > 1 ? textCellContent : '')
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
