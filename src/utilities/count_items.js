export default async function count_items(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName);
    const store = transaction.objectStore(storeName);
    const request = store.count();

    request.addEventListener("success", (event) =>
      resolve(event.target.result)
    );

    request.addEventListener("error", () =>
      reject({ message: "Failed to get count!" })
    );
  });
}
