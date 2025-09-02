/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card block
  function extractCard(cardEl) {
    const img = cardEl.querySelector('img');
    const link = cardEl.querySelector('a');
    // Use all alt text as title for flexibility
    let titleText = '';
    if (img && img.alt) {
      titleText = img.alt.trim();
    }
    let heading;
    if (titleText) {
      heading = document.createElement('strong');
      heading.textContent = titleText;
    }
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    // Always add CTA if link exists
    if (link && link.href) {
      const cta = document.createElement('div');
      const ctaLink = document.createElement('a');
      ctaLink.href = link.href;
      ctaLink.textContent = 'Learn more';
      cta.appendChild(ctaLink);
      textCell.appendChild(cta);
    }
    return [img, textCell];
  }

  const cards = [];
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  areaContainers.forEach(area => {
    const layoutItems = area.querySelectorAll('.umb-block-grid__layout-item[data-content-element-type-alias="imageBlock"]');
    layoutItems.forEach(item => {
      const imageBlock = item.querySelector('.image-block');
      if (imageBlock) {
        cards.push(extractCard(imageBlock));
      }
    });
  });

  // CRITICAL: Header row must be exactly one column, but must span two columns for correct table structure
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Cards (cards19)';
  th.setAttribute('colspan', '2');
  headerTr.appendChild(th);
  thead.appendChild(headerTr);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  cards.forEach(card => {
    const tr = document.createElement('tr');
    card.forEach(cell => {
      const td = document.createElement('td');
      if (cell) td.appendChild(cell);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  element.replaceWith(table);
}
