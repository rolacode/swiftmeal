export function getPlaceholderUrl(text = "Image") {
  const encoded = encodeURIComponent(text);
  return `https://placehold.co/300x200?text=${encoded}`;
}

