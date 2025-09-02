/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find direct child areas (left/right)
  function getAreas(el) {
    const areaContainer = el.querySelector('.umb-block-grid__area-container');
    if (!areaContainer) return [];
    return Array.from(areaContainer.querySelectorAll(':scope > .umb-block-grid__area'));
  }

  // For each area, get its content block (message or image)
  function getAreaContent(area) {
    const layoutContainer = area.querySelector('.umb-block-grid__layout-container');
    if (!layoutContainer) return null;
    const layoutItem = layoutContainer.querySelector(':scope > .umb-block-grid__layout-item');
    if (!layoutItem) return null;
    // For messageBlock: .message-block.card.h-100
    const messageBlock = layoutItem.querySelector('.message-block.card.h-100');
    if (messageBlock) {
      const cardBody = messageBlock.querySelector('.card-body');
      if (cardBody) {
        // Only include if there is actual content
        if (cardBody.childNodes.length > 0 && cardBody.textContent.trim()) {
          return Array.from(cardBody.childNodes).map(node => node.cloneNode(true));
        }
      }
      // If no card-body or no content, skip this cell
      return null;
    }
    // For imageBlock: .image-block
    const imageBlock = layoutItem.querySelector('.image-block');
    if (imageBlock) {
      const img = imageBlock.querySelector('img');
      if (img) {
        return img.cloneNode(true);
      }
      return null;
    }
    return null;
  }

  // Get the two areas (left and right)
  const areas = getAreas(element);
  if (areas.length !== 2) {
    return;
  }

  // Compose the columns in correct order, but skip empty cells
  const headerRow = ['Columns (columns3)'];
  const row = areas.map(area => getAreaContent(area)).filter(cell => cell && !(Array.isArray(cell) && cell.length === 0));
  if (row.length === 0) return;

  const rows = [headerRow, row];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
