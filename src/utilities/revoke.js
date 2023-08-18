export default function revoke(items) {
  items.forEach((item) => URL.revokeObjectURL(item.file));
}
