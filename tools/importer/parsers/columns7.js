/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (!areaContainers || areaContainers.length < 2) return;

  // LEFT COLUMN: video block
  const leftArea = areaContainers[0];
  let leftContent = null;
  const videoBlock = leftArea.querySelector('.internal-video-block');
  if (videoBlock) {
    leftContent = videoBlock;
  } else {
    leftContent = leftArea;
  }

  // RIGHT COLUMN: headline + richtext
  const rightArea = areaContainers[1];
  const rightContent = document.createElement('div');
  // Headline block
  const headlineBlock = rightArea.querySelector('.headline-block');
  if (headlineBlock) rightContent.appendChild(headlineBlock);
  // Richtext block
  const richTextBlock = rightArea.querySelector('.richtext-block');
  if (richTextBlock) rightContent.appendChild(richTextBlock);

  // Compose table rows
  const headerRow = ['Columns (columns7)'];
  const contentRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
