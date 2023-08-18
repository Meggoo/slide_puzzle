export default function load_document(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName);
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.addEventListener("success", () => {
      const document = request.result;
      const url = URL.createObjectURL(document.file);

      resolve({ ...document, file: url });
    });

    request.addEventListener("error", () => reject({ message: "Fuck!" }));
  });
}
