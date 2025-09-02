/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // Find the main grid container
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Get the two area containers (left and right columns)
  const areaContainers = gridContainer.querySelectorAll(':scope > .umb-block-grid__area-container > .umb-block-grid__area');
  if (areaContainers.length !== 2) return;

  // LEFT COLUMN: image block (with link)
  const leftArea = areaContainers[0];
  // Find the image block (may be wrapped in layout containers)
  const leftLayoutContainer = getDirectChild(leftArea, '.umb-block-grid__layout-container');
  let leftContent = null;
  if (leftLayoutContainer) {
    // Find the image block inside
    leftContent = leftLayoutContainer.querySelector('.image-block');
  }
  // Defensive: fallback to area itself
  if (!leftContent) leftContent = leftArea;

  // RIGHT COLUMN: message block + richtext block
  const rightArea = areaContainers[1];
  const rightLayoutContainer = getDirectChild(rightArea, '.umb-block-grid__layout-container');
  let rightContent = [];
  if (rightLayoutContainer) {
    // Message block (title + text)
    const messageBlock = rightLayoutContainer.querySelector('.message-block');
    if (messageBlock) rightContent.push(messageBlock);
    // Richtext block (button link)
    const richTextBlock = rightLayoutContainer.querySelector('.richtext-block');
    if (richTextBlock) rightContent.push(richTextBlock);
  } else {
    rightContent = [rightArea];
  }

  // Compose table rows
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
