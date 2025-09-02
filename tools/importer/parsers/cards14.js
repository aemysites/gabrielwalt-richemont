/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card block
  function extractCard(cardBlock) {
    // Find image
    const img = cardBlock.querySelector('img');
    // Find card body
    const cardBody = cardBlock.querySelector('.card-body');
    if (!img || !cardBody) return null;
    // Get all children of card body (to preserve all text)
    const textCell = [];
    Array.from(cardBody.childNodes).forEach((node) => {
      // Ignore empty text nodes
      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
      textCell.push(node.cloneNode(true));
    });
    return [img, textCell];
  }

  // Find all card blocks in the grid
  const cardBlocks = Array.from(
    element.querySelectorAll('.history-card-block.card.h-100')
  );

  // Compose table rows
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  cardBlocks.forEach((cardBlock) => {
    const cardRow = extractCard(cardBlock);
    if (cardRow) rows.push(cardRow);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
