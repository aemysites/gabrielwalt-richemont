/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Columns (columns15)'];

  // Defensive: find the two column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) {
    // Not enough columns, do not transform
    return;
  }

  // For each area, grab its content block (the .flexible-figure-block)
  const columns = Array.from(areaContainers).map(area => {
    // Find the first .flexible-figure-block inside this area
    const block = area.querySelector('.flexible-figure-block');
    // Defensive: fallback to area if not found
    return block || area;
  });

  // Second row: one cell per column
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
