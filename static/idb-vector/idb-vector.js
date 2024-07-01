import { SortedArray } from "./sortedarray.js";

const DB_DEFAUlTS = {
  dbName: "vectorDB",
  objectStore: "vectors"
};

function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, aVal, idx) => sum + aVal * b[idx], 0);
  const aMagnitude = Math.sqrt(a.reduce((sum, aVal) => sum + aVal * aVal, 0));
  const bMagnitude = Math.sqrt(b.reduce((sum, bVal) => sum + bVal * bVal, 0));
  return dotProduct / (aMagnitude * bMagnitude);
}

async function create(options) {
  const { dbName, objectStore, vectorPath } = {
    ...DB_DEFAUlTS,
    ...options,
  };
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore(objectStore, { autoIncrement: true });
      store.createIndex(vectorPath, vectorPath, { unique: false });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

class VectorDB {
  #objectStore;
  #vectorPath;
  #db;

  constructor(options) {
    const { dbName, objectStore, vectorPath } = {
      ...DB_DEFAUlTS,
      ...options,
    };

    if (!dbName) {
      // Note only used in create()
      throw new Error("dbName is required");
    }

    if (!objectStore) {
      throw new Error("objectStore is required");
    }

    if (!vectorPath) {
      throw new Error("vectorPath is required");
    }

    this.#objectStore = objectStore;
    this.#vectorPath = vectorPath;

    this.#db = create(options);
  }

  async insert(object) {

    if (this.#vectorPath in object == false) {
      throw new Error(`${this.#vectorPath} expected to be present 'object' being inserted`);
    }

    if (Array.isArray(object[this.#vectorPath]) == false) {
      throw new Error(`${this.#vectorPath} on 'object' is expected to be an Array`);
    }

    const db = await this.#db;
    const storeName = this.#objectStore;

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.add(object);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.error);
      } 
    });
  }

  async delete(key) {

    if (key == null) {
      throw new Error(`Unable to delete object without a key`)
    }

    const db = await this.#db;
    const storeName = this.#objectStore;

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.error);
      } 
    });
  }

  async update(key, object) {

    if (key == null) {
      throw new Error(`Unable to update object without a key`)
    }

    if (this.#vectorPath in object == false) {
      throw new Error(`${this.#vectorPath} expected to be present 'object' being updated`);
    }

    if (Array.isArray(object[this.#vectorPath]) == false) {
      throw new Error(`${this.#vectorPath} on 'object' is expected to be an Array`);
    }

    const db = await this.#db;
    const storeName = this.#objectStore;

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const request = store.put(object, key);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.error);
      } 
    });
  }

  // Return the most similar items up to [limit] items
  async query(queryVector, options = { limit: 10 }) {
    const { limit } = options;

    const queryVectorLength = queryVector.length;

    const db = await this.#db;
    const storeName = this.#objectStore;
    const vectorPath = this.#vectorPath;

    const transaction = db.transaction([storeName], "readonly");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.openCursor();

    const similarities = new SortedArray(limit, "similarity");

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const vectorValue = cursor.value[vectorPath];
          if (vectorValue.length == queryVectorLength) {
            // Only add the vector to the results set if the vector is the same length as query.
            const similarity = cosineSimilarity(
              queryVector,
              vectorValue
            );
            similarities.insert({ object: cursor.value, key: cursor.key, similarity });
          }
          cursor.continue();
        } else {
          // sorted already.
          resolve(similarities.slice(0, limit));
        }
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  get objectStore() {
    // Escape hatch.
    return this.#objectStore;
  }
}
window.VectorDB=VectorDB
export { VectorDB };
