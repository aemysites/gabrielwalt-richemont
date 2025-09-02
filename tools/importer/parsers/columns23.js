/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns23)'];

  // Defensive: Find the two column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // Left column: image block
  const leftArea = areaContainers[0];
  const imageBlock = leftArea.querySelector('.image-block');
  let leftCell = '';
  if (imageBlock) {
    leftCell = imageBlock;
  }

  // Right column: message block
  const rightArea = areaContainers[1];
  const messageBlock = rightArea.querySelector('.message-block');
  let rightCell = '';
  if (messageBlock) {
    rightCell = messageBlock;
  }

  // Content row: two columns side by side
  const contentRow = [leftCell, rightCell];

  // Compose table cells
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
