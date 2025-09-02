/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element is a UL with LI children
  if (!element || !element.matches('ul')) return;
  const headerRow = ['Columns (columns32)'];

  // Get all immediate LI children (each is a column)
  const columns = Array.from(element.children).filter(child => child.tagName === 'LI');

  // For each column, grab its entire content (usually an IMG)
  const contentRow = columns.map(col => {
    // If the column contains only an image, use the image element directly
    if (col.children.length === 1 && col.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild;
    }
    // Otherwise, include the whole LI element
    return col;
  });

  // Compose the table: header row, then content row
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
