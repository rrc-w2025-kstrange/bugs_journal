type CountListener = () => void;

let bugCount = 0;
const listeners = new Set<CountListener>();

export const bugCountRepository = {
  get(): number {
    return bugCount;
  },

  set(value: number): void {
    bugCount = value;
    listeners.forEach((listener) => listener());
  },

  subscribe(listener: CountListener): () => void {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};
