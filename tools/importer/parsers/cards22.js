/* global WebImporter */
export default function parse(element, { document }) {
  // Find the board members block
  const boardBlock = element.querySelector('.board-members-block');
  if (!boardBlock) return;

  // Get all board member cards
  const cards = boardBlock.querySelectorAll('li.card.board-member');

  // Table header
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cards.forEach(card => {
    // Image (first cell)
    const img = card.querySelector('img.board-member__image');

    // Text content (second cell)
    const cardBody = card.querySelector('.card-body');
    const title = cardBody ? cardBody.querySelector('h3.card-title') : null;
    const position = cardBody ? cardBody.querySelector('.board-member__position') : null;
    // Call-to-action link
    const cardFooter = card.querySelector('.card-footer');
    const ctaLink = cardFooter ? cardFooter.querySelector('a.board-member__link') : null;

    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (position) textCell.push(position);
    if (ctaLink) textCell.push(ctaLink);

    rows.push([
      img,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
