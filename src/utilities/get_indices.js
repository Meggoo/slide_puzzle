export default function get_indices(currentPage, totalPages, maxPages) {
  const indices = [];

  if (totalPages <= maxPages) {
    for (let i = 0; i < totalPages; i++) indices.push(i + 1);
    return indices;
  }

  const half = Math.ceil(maxPages / 2);

  if (currentPage <= half) {
    for (let i = 0; i < maxPages; i++) indices.push(i + 1);
    return indices;
  }

  const diff = totalPages - currentPage;

  if (diff < half) {
    for (let i = 0; i < maxPages; i++) indices.unshift(totalPages - i);
    return indices;
  }

  const pad = Math.floor(maxPages / 2);
  const start = currentPage - pad + (maxPages % 2 ? 0 : 1);
  const end = currentPage + pad;

  for (let i = start; i <= end; i++) indices.push(i);
  return indices;
}
