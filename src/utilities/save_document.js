export default function save_document(db, storeName, document) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(document);

    request.addEventListener("success", () => {
      const url = URL.createObjectURL(document.file);

      resolve({ ...document, file: url });
    });

    request.addEventListener("error", () => reject({ message: "Fuck!" }));
  });
}
