/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get all immediate child card elements
  const cards = element.querySelectorAll(':scope > .document-card-block');

  cards.forEach((card) => {
    // Skip cards that are hidden (display: none)
    if (card.style && card.style.display === 'none') return;

    // Find the image (first img in card)
    const img = card.querySelector('img');

    // Compose the text cell
    const textContent = [];

    // Card body: type and title
    const cardBody = card.querySelector('.card-body');
    if (cardBody) {
      // Type (optional, as a paragraph)
      const type = cardBody.querySelector('.document-card-block__type');
      if (type) {
        // Use a clone to avoid moving the element from the DOM
        textContent.push(type.cloneNode(true));
      }
      // Title (optional, as heading)
      const title = cardBody.querySelector('.card-title');
      if (title) {
        textContent.push(title.cloneNode(true));
      }
    }

    // Card footer: CTA link (optional)
    const cardFooter = card.querySelector('.card-footer');
    if (cardFooter) {
      const ctaLink = cardFooter.querySelector('a');
      if (ctaLink) {
        textContent.push(ctaLink.cloneNode(true));
      }
    }

    // Ensure all text content from card is included (fallback)
    // If type/title missing, include all text from cardBody
    if (textContent.length === 0 && cardBody) {
      textContent.push(document.createTextNode(cardBody.textContent.trim()));
    }

    // Build the row: [image, text cell]
    const row = [img ? img.cloneNode(true) : '', textContent];
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
