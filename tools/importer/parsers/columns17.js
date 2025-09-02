/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find all top-level column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  const columns = [];

  areaContainers.forEach((area) => {
    // Each area should contain a layout container with a single content block
    const layoutContainer = area.querySelector('.umb-block-grid__layout-container');
    if (!layoutContainer) return;
    // Get the first layout item (should be the content block)
    const layoutItem = layoutContainer.querySelector('.umb-block-grid__layout-item');
    if (!layoutItem) return;
    // The actual content block (e.g., .flexible-figure-block)
    const blockContent = layoutItem.querySelector('.flexible-figure-block');
    if (blockContent) {
      columns.push(blockContent);
    }
  });

  // Table header as required
  const headerRow = ['Columns (columns17)'];
  // Table content row: one cell per column
  const contentRow = columns;

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
