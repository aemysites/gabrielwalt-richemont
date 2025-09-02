/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns29)'];

  // Defensive: Find the grid container for columns
  const gridContainer = element.querySelector('.grid-container');
  let columns = [];

  if (gridContainer) {
    // Get all immediate area containers (these are the columns)
    const areaContainers = gridContainer.querySelectorAll('.umb-block-grid__area');
    columns = Array.from(areaContainers).map(area => {
      // For each area, find its content (figureBlock or similar)
      const layoutContainer = area.querySelector('.umb-block-grid__layout-container');
      if (layoutContainer) {
        // Use the entire layout item as the cell content
        const layoutItem = layoutContainer.querySelector('.umb-block-grid__layout-item');
        if (layoutItem) {
          return layoutItem;
        }
      }
      // If no content, return empty string
      return '';
    });
    // Remove empty columns (areas with no content)
    columns = columns.filter(col => col && (typeof col !== 'string' || col.trim() !== ''));
  }

  // Defensive: If no columns found, fallback to empty cells
  if (columns.length === 0) {
    columns = [''];
  }

  // Build the table rows
  const cells = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
