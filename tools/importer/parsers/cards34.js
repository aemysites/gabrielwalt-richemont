/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find the cards list container
  const cardsList = element.querySelector('.document-cards-block__cards-list');
  if (!cardsList) return;

  // Select all card elements
  const cardElements = cardsList.querySelectorAll('.manually-pick-item-card');

  cardElements.forEach(card => {
    // Get image (first img in card)
    const img = card.querySelector('img');
    // Get card body (contains title and description)
    const cardBody = card.querySelector('.card-body');
    if (!img || !cardBody) return;

    // Get title (h3)
    const title = cardBody.querySelector('.card-title');
    // Get description (p)
    const description = cardBody.querySelector('.manually-pick-item-card__description');

    // Compose text cell
    const textCellContent = [];
    if (title) textCellContent.push(title);
    if (description) textCellContent.push(description);

    // Add row: [image, text]
    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with block table
  element.replaceWith(block);
}
