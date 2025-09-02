/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the two column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // Left column: message block
  const leftArea = areaContainers[0];
  let leftContent = null;
  const leftLayoutContainer = leftArea.querySelector('.umb-block-grid__layout-container');
  if (leftLayoutContainer) {
    // Find the message block
    const messageBlock = leftLayoutContainer.querySelector('.message-block');
    if (messageBlock) {
      leftContent = messageBlock;
    }
  }
  // Fallback: use area itself if message block not found
  if (!leftContent) leftContent = leftArea;

  // Right column: image block
  const rightArea = areaContainers[1];
  let rightContent = null;
  const rightLayoutContainer = rightArea.querySelector('.umb-block-grid__layout-container');
  if (rightLayoutContainer) {
    // Find the image block
    const imageBlock = rightLayoutContainer.querySelector('.image-block');
    if (imageBlock) {
      rightContent = imageBlock;
    }
  }
  // Fallback: use area itself if image block not found
  if (!rightContent) rightContent = rightArea;

  // Table structure: header, then row with two columns
  const cells = [
    ['Columns (columns2)'],
    [leftContent, rightContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
