/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <video> element inside the block
  const video = element.querySelector('video');
  let videoLink = null;
  let textContent = '';

  // Collect any text content from the block (outside the video)
  // This ensures we capture all text, even if not inside <video>
  Array.from(element.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      textContent += node.textContent.trim();
    } else if (node.nodeType === Node.ELEMENT_NODE && node !== video) {
      textContent += node.textContent.trim();
    }
  });

  if (video) {
    // Try to find a <source> element with a src
    const source = video.querySelector('source');
    if (source && source.src) {
      // Create a link to the video source
      videoLink = document.createElement('a');
      videoLink.href = source.src;
      videoLink.textContent = source.src;
    } else if (video.src) {
      // Fallback: <video> may have a src attribute
      videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = video.src;
    }
  }

  // Compose the cell content: video element, link (if found), and any text content
  const cellContent = [];
  if (video) cellContent.push(video);
  if (videoLink) cellContent.push(document.createElement('br'), videoLink);
  if (textContent) cellContent.push(document.createElement('br'), textContent);

  // Always use the required header
  const headerRow = ['Video (video24)'];
  const contentRow = [cellContent.length ? cellContent : ''];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
