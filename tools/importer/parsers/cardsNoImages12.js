/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all figure-blocks from all areas
  function getFigureBlocks(root) {
    const blocks = [];
    // Select all area containers (left, middle, right)
    const areaContainers = root.querySelectorAll('.umb-block-grid__area');
    areaContainers.forEach(area => {
      // Each area has a layout container with layout items
      const layoutItems = area.querySelectorAll('.umb-block-grid__layout-item');
      layoutItems.forEach(item => {
        const figureBlock = item.querySelector('.figure-block');
        if (figureBlock) {
          blocks.push(figureBlock);
        }
      });
    });
    return blocks;
  }

  // Build the table rows
  const headerRow = ['Cards (cardsNoImages12)'];
  const rows = [headerRow];

  // Defensive: find the grid container
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) {
    // If not found, do nothing
    return;
  }

  // Get all figure-blocks in order
  const figureBlocks = getFigureBlocks(gridContainer);

  // Each figure-block becomes a row
  figureBlocks.forEach(block => {
    rows.push([block]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
