/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards31)'];
  const rows = [headerRow];

  // Find the grid container holding all areas
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Each area contains 1-2 image blocks (cards)
  const areaContainers = gridContainer.querySelectorAll('.umb-block-grid__area');
  areaContainers.forEach(area => {
    // Each area has a layout container with 1-2 image blocks
    const layoutItems = area.querySelectorAll('.umb-block-grid__layout-item');
    layoutItems.forEach(layoutItem => {
      // Defensive: Find the image block
      const imageBlock = layoutItem.querySelector('.image-block');
      if (!imageBlock) return;
      // Find the image inside the image block
      const img = imageBlock.querySelector('img');
      if (!img) return;
      // Optionally, wrap the image in its link if present
      const link = imageBlock.querySelector('a');
      let imageCell;
      if (link && link.contains(img)) {
        // Use the link with the image inside
        imageCell = link.cloneNode(true);
      } else {
        imageCell = img.cloneNode(true);
      }
      // Text cell: Use the alt text of the image as the card title (as heading)
      const title = img.getAttribute('alt') || '';
      const textCell = document.createElement('div');
      if (title) {
        const heading = document.createElement('strong');
        heading.textContent = title;
        textCell.appendChild(heading);
      }
      rows.push([imageCell, textCell]);
    });
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
