/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid container
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Get the two area containers (left and right columns)
  const areaContainers = gridContainer.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // Left column: rich text
  const leftArea = areaContainers[0];
  const leftContent = leftArea.querySelector('.richtext-block');
  // Defensive fallback: if not found, use area itself
  const leftCell = leftContent || leftArea;

  // Right column: image
  const rightArea = areaContainers[1];
  const imageBlock = rightArea.querySelector('.image-block');
  // Defensive fallback: if not found, use area itself
  const rightCell = imageBlock || rightArea;

  // Table header
  const headerRow = ['Columns (columns5)'];
  // Table content row: left and right columns
  const contentRow = [leftCell, rightCell];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
