/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as specified
  const headerRow = ['Columns (columns1)'];

  // Find the grid container holding the columns
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find all immediate column areas (should be 3 for this layout)
  const areaContainers = gridContainer.querySelectorAll('.umb-block-grid__area');

  // Defensive: If no areas found, abort
  if (!areaContainers || areaContainers.length === 0) return;

  // For each area, extract the main content block (the card)
  const columns = Array.from(areaContainers).map(area => {
    // Find the card inside this area
    const card = area.querySelector('.message-block.card');
    // Defensive: If not found, fallback to area itself
    return card || area;
  });

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
