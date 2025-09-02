/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children with a selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find all the .umb-block-grid__area elements (each is a card)
  const areaEls = element.querySelectorAll('.umb-block-grid__area');

  // Build the header row
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // For each card area, extract image and text content
  areaEls.forEach(area => {
    // Each area has a .umb-block-grid__layout-container with two .umb-block-grid__layout-item children
    const layoutContainer = area.querySelector('.umb-block-grid__layout-container');
    if (!layoutContainer) return;
    const layoutItems = layoutContainer.querySelectorAll(':scope > .umb-block-grid__layout-item');
    if (layoutItems.length < 2) return;

    // Find image and message blocks
    let imageEl = null;
    let textEl = null;
    layoutItems.forEach(item => {
      if (item.querySelector('.image-block')) {
        // Use the .image-block element directly
        imageEl = item.querySelector('.image-block');
      } else if (item.querySelector('.message-block')) {
        // Use the .message-block element directly
        textEl = item.querySelector('.message-block');
      }
    });
    if (!imageEl || !textEl) return;

    // For the text cell, we want only the card-body and card-footer (not the outer .message-block wrapper)
    const cardBody = textEl.querySelector('.card-body');
    const cardFooter = textEl.querySelector('.card-footer');
    // Defensive: if cardBody is missing, skip
    if (!cardBody) return;
    // Compose the text cell content
    const textCellContent = cardFooter ? [cardBody, cardFooter] : [cardBody];

    // Add the row: [image, text content]
    rows.push([imageEl, textCellContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
