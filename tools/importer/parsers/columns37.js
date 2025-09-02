/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Find the grid container (holds the two columns)
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // 2. Find the two area containers (left and right columns)
  const areaContainers = gridContainer.querySelectorAll(':scope > .umb-block-grid__area-container > .umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // 3. For each area, get the main content block
  const leftArea = areaContainers[0];
  const rightArea = areaContainers[1];

  // Left column: message block (text + button)
  const leftContent = leftArea.querySelector('.umb-block-grid__layout-container > .umb-block-grid__layout-item > .message-block');
  // Right column: image block
  const rightContent = rightArea.querySelector('.umb-block-grid__layout-container > .umb-block-grid__layout-item > .image-block');

  // Defensive: if either is missing, fallback to area content
  const leftCell = leftContent || leftArea;
  const rightCell = rightContent || rightArea;

  // 4. Build the table rows
  const headerRow = ['Columns (columns37)'];
  const contentRow = [leftCell, rightCell];

  // 5. Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 6. Replace the original element
  element.replaceWith(table);
}
