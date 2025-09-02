/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns4)'];

  // Find the two main column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // Left column: headline and message
  const leftArea = areaContainers[0];
  // Get headline block
  const headline = leftArea.querySelector('.headline-block');
  // Get message block content
  const messageBlock = leftArea.querySelector('.message-block');

  // Compose left cell content
  const leftCellContent = [];
  if (headline) leftCellContent.push(headline.cloneNode(true));
  if (messageBlock) leftCellContent.push(messageBlock.cloneNode(true));

  // Right column: image block
  const rightArea = areaContainers[1];
  // Find the image element inside right area
  const img = rightArea.querySelector('img');
  const rightCellContent = img ? img.cloneNode(true) : '';

  // Second row: two columns, left (headline+message), right (image)
  const contentRow = [leftCellContent, rightCellContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
