export function getPlaceholderUrl(text = "Image", width = 300, height = 200) {
  const t = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}?text=${t}`;
}
