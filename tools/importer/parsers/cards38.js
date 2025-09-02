/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the download links from card-footer
  function extractFooterContent(footer) {
    // If there's a dropdown, collect all language links
    const dropdown = footer.querySelector('.dropdown-menu');
    if (dropdown) {
      // Get all <a> links in dropdown
      const links = Array.from(dropdown.querySelectorAll('a')).map((a) => a);
      // Optionally, add the dropdown button label at the top
      const button = footer.querySelector('button');
      if (button) {
        const label = document.createElement('p');
        label.textContent = button.textContent.trim();
        return [label, ...links];
      }
      return links;
    }
    // Otherwise, just get the direct <a> link
    const link = footer.querySelector('a');
    if (link) {
      return [link];
    }
    return [];
  }

  // Get all visible cards
  const cards = Array.from(element.querySelectorAll('.document-card-block.card'))
    .filter(card => card.style.display !== 'none');

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards38)']);

  cards.forEach(card => {
    // First cell: image
    const img = card.querySelector('img');
    // Second cell: text content
    const body = card.querySelector('.card-body');
    const footer = card.querySelector('.card-footer');

    // Compose text cell
    const cellContent = [];
    // Type (Document/Policy)
    const type = body.querySelector('.document-card-block__type');
    if (type) {
      const typeP = document.createElement('p');
      typeP.textContent = type.textContent.trim();
      cellContent.push(typeP);
    }
    // Title (h3)
    const title = body.querySelector('.card-title');
    if (title) {
      // Use heading element directly
      cellContent.push(title);
    }
    // Footer links/buttons
    const footerContent = extractFooterContent(footer);
    if (footerContent.length > 0) {
      cellContent.push(...footerContent);
    }

    rows.push([
      img,
      cellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
