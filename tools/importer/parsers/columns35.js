/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find the two main column areas
  const areaContainers = gridContainer.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // LEFT COLUMN: headline + richtext
  const leftArea = areaContainers[0];
  const leftBlocks = leftArea.querySelectorAll('.umb-block-grid__layout-item');
  let leftContent = [];
  leftBlocks.forEach(block => {
    const headline = block.querySelector('.headline-block');
    if (headline) leftContent.push(headline.cloneNode(true));
    const richtext = block.querySelector('.richtext-block');
    if (richtext) leftContent.push(richtext.cloneNode(true));
  });

  // RIGHT COLUMN: video block
  const rightArea = areaContainers[1];
  const rightBlocks = rightArea.querySelectorAll('.umb-block-grid__layout-item');
  let rightCellContent = [];
  rightBlocks.forEach(block => {
    const videoBlock = block.querySelector('.internal-video-block');
    if (videoBlock) {
      // Find the <video> element
      const video = videoBlock.querySelector('video');
      if (video) {
        // Use poster as preview image if present
        const poster = video.getAttribute('poster');
        if (poster) {
          const previewImg = document.createElement('img');
          previewImg.src = poster;
          previewImg.alt = video.getAttribute('data-title') || video.getAttribute('title') || '';
          rightCellContent.push(previewImg);
        }
        // Find the <source> element for the video src
        const source = video.querySelector('source');
        if (source && source.src) {
          const videoLink = document.createElement('a');
          videoLink.href = source.src;
          videoLink.textContent = 'Video';
          rightCellContent.push(videoLink);
        }
      }
    }
  });

  // Compose table rows
  const headerRow = ['Columns (columns35)'];
  // Second row: left and right columns
  const secondRow = [leftContent, rightCellContent];

  // Create table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
