/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main job-listings-component block
  const jobListings = element.querySelector('.job-listings-component');
  if (!jobListings) return;

  // Find the two column areas (left and right)
  const areas = jobListings.querySelectorAll('.umb-block-grid__area');
  // Defensive: only proceed if we have at least two columns
  if (areas.length < 2) return;

  // First column: job message block
  const leftCol = areas[0];
  // Second column: job listings (may be empty)
  const rightCol = areas[1];

  // Use the content of each area directly as table cells
  const headerRow = ['Columns (columns16)'];
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
