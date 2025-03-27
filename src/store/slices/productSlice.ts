import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: "price_asc" | "price_desc" | "rating" | null;
  };
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: null,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<ProductState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },
    updateProduct: (
      state,
      action: PayloadAction<Partial<Product> & { id: string }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        state.filteredItems = applyFilters(state.items, state.filters);
      }
    },
  },
});

const applyFilters = (
  products: Product[],
  filters: ProductState["filters"]
) => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(
      (product) => product.category === filters.category
    );
  }

  if (filters.minPrice !== null) {
    filtered = filtered.filter((product) => product.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== null) {
    filtered = filtered.filter((product) => product.price <= filters.maxPrice!);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return filtered;
};

export const {
  setLoading,
  setError,
  setProducts,
  setFilters,
  clearFilters,
  updateProduct,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
