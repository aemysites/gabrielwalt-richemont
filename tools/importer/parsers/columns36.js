/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the first direct child matching selector
  function findDirectChild(parent, selector) {
    return Array.from(parent.children).find(child => child.matches(selector));
  }

  // Find the main grid container
  const grid = element.querySelector('.umb-block-grid');
  if (!grid) return;

  // Find the area container (holds the columns)
  const areaContainer = grid.querySelector('.umb-block-grid__area-container');
  if (!areaContainer) return;

  // Get all direct area columns
  const areas = areaContainer.querySelectorAll(':scope > .umb-block-grid__area');
  if (!areas.length) return;

  // For each area, collect its content as a single cell
  const columns = [];
  areas.forEach(area => {
    // Each area contains a layout-container, which contains layout-items
    const layoutContainer = findDirectChild(area, '.umb-block-grid__layout-container');
    if (!layoutContainer) {
      columns.push('');
      return;
    }
    // Collect all direct layout-items
    const layoutItems = layoutContainer.querySelectorAll(':scope > .umb-block-grid__layout-item');
    // For each layout-item, get its main content div (first div inside)
    const contentEls = [];
    layoutItems.forEach(item => {
      // Find the first div inside the item
      const mainDiv = findDirectChild(item, 'div');
      if (mainDiv) {
        contentEls.push(mainDiv);
      }
    });
    // If only one content element, use it directly; else, use array
    if (contentEls.length === 1) {
      columns.push(contentEls[0]);
    } else if (contentEls.length > 1) {
      columns.push(contentEls);
    } else {
      columns.push('');
    }
  });

  // Build the table rows
  const headerRow = ['Columns (columns36)'];
  const contentRow = columns;
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
