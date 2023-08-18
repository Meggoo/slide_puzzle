export default function delete_document(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.addEventListener("success", () => resolve(true));

    request.addEventListener("error", () => reject({ message: "fuck!" }));
  });
}
