const storage = {};

export const cache = {
    getItem : (name: string) => {
        if (storage[name]) {
            return storage[name];
        }
    },
    setItem : (name: string, item) => {
        storage[name] = item;
    }
}
