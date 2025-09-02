/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the two column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (!areaContainers || areaContainers.length < 2) return;

  // Left column: should contain image block
  const leftArea = areaContainers[0];
  let leftContent = null;
  // Find image block inside left area
  const imageBlock = leftArea.querySelector('.image-block');
  if (imageBlock) {
    leftContent = imageBlock;
  } else {
    // fallback: use all children
    leftContent = Array.from(leftArea.children);
  }

  // Right column: should contain message block
  const rightArea = areaContainers[1];
  let rightContent = null;
  // Find message block inside right area
  const messageBlock = rightArea.querySelector('.message-block');
  if (messageBlock) {
    rightContent = messageBlock;
  } else {
    rightContent = Array.from(rightArea.children);
  }

  // Table header
  const headerRow = ['Columns (columns10)'];
  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
