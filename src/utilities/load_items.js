export default function load_items(
  db,
  storeName,
  indexName,
  page,
  itemsPerPage
) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName);
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.openCursor(null, "prev");
    const items = [];
    let count, advanced;

    advanced = false;
    count = 0;
    request.addEventListener("success", (event) => {
      const cursor = event.target.result;

      if (cursor && !advanced && ~-page) {
        advanced = true;
        cursor.advance((page - 1) * itemsPerPage);
        return;
      }

      if (count >= itemsPerPage || !cursor)
        return resolve(
          items.map((item) => ({
            ...item,
            file: URL.createObjectURL(item.file),
          }))
        );

      items.push(cursor.value);
      count++;
      cursor.continue();
    });

    request.addEventListener("error", () =>
      reject({ message: "failed to retrieve items!" })
    );
  });
}
