/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from the block
  function extractCards(root) {
    const cards = [];
    // Find all area containers (left, middle, right)
    const areaContainers = root.querySelectorAll('.umb-block-grid__area');
    areaContainers.forEach(area => {
      // Each area contains a layout container with one or more items
      const layoutItems = area.querySelectorAll('.umb-block-grid__layout-item');
      layoutItems.forEach(item => {
        // Each item contains an image-block
        const imageBlock = item.querySelector('.image-block');
        if (imageBlock) {
          // Find the image
          const img = imageBlock.querySelector('img');
          // Find the link (if present)
          const link = imageBlock.querySelector('a');
          // Compose the image cell (just the image)
          let imageCell = img;
          // Compose the text cell (title from alt, plus all text nodes inside image-block)
          let textCellContent = [];
          // Extract all text nodes inside imageBlock (including alt text)
          let maisonName = '';
          if (img && img.alt) {
            maisonName = img.alt;
            // Try to extract up to 'logo' or 'with'
            const match = maisonName.match(/^(.*?)\s+(logo|with)/i);
            if (match && match[1]) {
              maisonName = match[1].trim();
            } else {
              maisonName = maisonName.trim();
            }
            // Create heading element
            const heading = document.createElement('strong');
            heading.textContent = maisonName;
            textCellContent.push(heading);
          }
          // Extract all visible text nodes inside imageBlock (excluding script/style)
          Array.from(imageBlock.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              const text = document.createElement('span');
              text.textContent = node.textContent.trim();
              textCellContent.push(text);
            }
          });
          // Optionally add link as CTA if present
          if (link && link.href) {
            const cta = document.createElement('a');
            cta.href = link.href;
            cta.textContent = 'Learn more';
            cta.style.display = 'block';
            cta.style.marginTop = '8px';
            textCellContent.push(cta);
          }
          // Compose the row: [image, text]
          cards.push([imageCell, textCellContent]);
        }
      });
    });
    return cards;
  }

  // Compose header row
  const headerRow = ['Cards (cards8)'];
  // Extract cards
  const cards = extractCards(element);
  // Compose table data
  const tableData = [headerRow, ...cards];
  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace original element
  element.replaceWith(block);
}
