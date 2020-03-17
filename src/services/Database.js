class DatabaseProvider {
	constructor() {
		this.db = {};
		this.dbName = 'todos';
		this.dbVersion = 1;
		this.stores = { TODOS: 'todos' };
		this.request = null;
	}

	init = () => {
		return new Promise((resolve) => {
			this.request = window.indexedDB.open(this.dbName, this.dbVersion);

			this.request.onupgradeneeded = () => {
				this.db = this.request.result;
				this.createTodosStore();
			};

			this.request.onsuccess = event => {
				this.db = event.target.result;
				resolve();
			};

			this.request.onerror = error => console.error({ error });
		});
	};

	createTodosStore = () => {
		const storeConfig = { keyPath: "id", autoIncrement: true };
		const objectStore = this.db.createObjectStore(this.stores.TODOS, storeConfig);
		objectStore.createIndex("name", "name");
		objectStore.createIndex("completed", "completed");
	};

	getTodosObjectStore = () => {
		const transaction = this.db.transaction([this.stores.TODOS], "readwrite");
		transaction.onerror = error => console.error('There was a transaction error', { error });
		return transaction.objectStore(this.stores.TODOS);
	};

	add = name => {
		return new Promise((resolve, reject) => {
			const objectStore = this.getTodosObjectStore();
			const addRequest = objectStore.put({ name, completed: false });
			addRequest.onsuccess = async () => {
				const allTodos = await this.getAll();
				resolve(allTodos);
			};
			addRequest.onerror = error => reject(error);
		});
	};

	updateById = (id, newValue) => {
		return new Promise((resolve, reject) => {
			const objectStore = this.getTodosObjectStore();
			const keyRange = IDBKeyRange.only(id);
			const cursor = objectStore.openCursor(keyRange);

			cursor.onsuccess = () => {
				const cursorWithValue = cursor.result;
				const { value } = cursorWithValue;

				const updateTo = { ...value, ...newValue };
				const update = cursorWithValue.update(updateTo);
				update.onsuccess = async () => {
					const allTodos = this.getAll();
					resolve(allTodos);
				};
				update.onerror = error => reject(error);
			};

			cursor.onerror = error => console.log('Item on check error', { error });
		});
	};

	toggleCompleted = id => {
		return new Promise((resolve, reject) => {
			const objectStore = this.getTodosObjectStore();
			const keyRange = IDBKeyRange.only(id);
			const cursor = objectStore.openCursor(keyRange);

			cursor.onsuccess = () => {
				const cursorWithValue = cursor.result;
				const { value } = cursorWithValue;

				const updateTo = { ...value, completed: !value.completed };
				const update = cursorWithValue.update(updateTo);
				update.onsuccess = async () => {
					const allTodos = await this.getAll();
					resolve(allTodos);
				};
				update.onerror = err => reject(err);
			};

			cursor.onerror = error => console.log('Item on check error', { error });
		});
	};

	deleteById = id => {
		return new Promise((resolve, reject) => {
			const objectStore = this.getTodosObjectStore();
			const deleting = objectStore.delete(id);
			deleting.onsuccess = async response => {
				const allTodos = await this.getAll();
				resolve(allTodos);
			};
			deleting.onerror = error => reject(error);
		});
	};

	getAll = () => {
		return new Promise((resolve, reject) => {
			const objectStore = this.getTodosObjectStore();

			const openCursor = objectStore.openCursor();
			const items = [];

			openCursor.onsuccess = event => {
				const cursor = event.target.result;
				if (cursor) {
					items.push(cursor.value);
					cursor.continue();
				} else {
					resolve(items);
				}
			};

			openCursor.onerror = error => reject(error);
		});
	};

	getById = id => {
		return new Promise((resolve, reject) => {
			const objectStore = this.getTodosObjectStore();
			const request = objectStore.get(id);
			request.onsuccess = () => request.result ? resolve(request.result) : reject("Not found");
			request.onerror = error => reject(error);
		});
	};
}

export const DatabaseService = new DatabaseProvider();