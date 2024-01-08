import create, { GetState, SetState } from 'zustand';

interface Item {
  id: number;
  name: string;
  price: number;
}

interface Store {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  totalPrice: () => number;
}

const useProductStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    items: [],
    addItem: (item: Item) => set(state => ({ items: [...state.items, item] })),
    removeItem: (id: number) =>
      set(state => ({ items: state.items.filter(item => item.id !== id) })),
    totalPrice: () =>
      get().items.reduce((total, item) => total + item.price, 0),
  }),
);

export default useProductStore;
