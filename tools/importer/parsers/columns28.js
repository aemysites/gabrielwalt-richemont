/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the brands block container
  const brandsBlock = Array.from(element.children).find(child => child.classList && child.classList.contains('brands-block'));
  if (!brandsBlock) return;

  // Get all brand links (each contains an image)
  const brandLinks = Array.from(brandsBlock.children).filter(child => child.tagName === 'A');
  if (brandLinks.length === 0) return;

  // Each brand logo is a column in the second row
  const columnsRow = brandLinks.map(link => link);

  // Table structure: header, then one row with all logos as columns
  const cells = [
    ['Columns (columns28)'],
    columnsRow
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
