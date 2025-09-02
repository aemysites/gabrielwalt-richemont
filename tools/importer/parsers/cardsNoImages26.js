/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the board members block
  const block = element.querySelector('.board-members-block');
  if (!block) return;

  // Find all card elements (li.board-member)
  const cards = Array.from(block.querySelectorAll('ol > li.board-member'));
  if (!cards.length) return;

  // Table header row
  const headerRow = ['Cards (cardsNoImages26)'];
  const rows = [headerRow];

  // For each card, build a cell with heading, position, and CTA link
  cards.forEach((card) => {
    const cardBody = card.querySelector('.card-body');
    const cardFooter = card.querySelector('.card-footer');
    const cellContent = [];

    // Heading (h3)
    const heading = cardBody && cardBody.querySelector('h3');
    if (heading) cellContent.push(heading);

    // Position (div)
    const position = cardBody && cardBody.querySelector('.board-member__position');
    if (position) cellContent.push(position);

    // CTA link (a)
    const cta = cardFooter && cardFooter.querySelector('a.board-member__link');
    if (cta) cellContent.push(cta);

    rows.push([cellContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
