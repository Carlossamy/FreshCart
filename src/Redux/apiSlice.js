import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getAllProducts = createAsyncThunk(
  "eCommerce/getAllProducts",
  async function () {
    return await fetch("https://ecommerce.routemisr.com/api/v1/products").then(
      (res) => res.json()
    );
  }
);

const getAllBrands = createAsyncThunk(
  "eCommerce/getAllBrands",
  async function () {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return await response.json();
  }
);

export const forkifySlice = createSlice({
  name: "eCommerce",
  initialState: {
    allBrands: null,
    allProducts: null,
    isLoading: false,
    isError: false
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, function (state, action) {
      console.log(action.payload.data);
      state.isLoading = false;
      state.allProducts = action.payload.data;
    });
    builder.addCase(getAllProducts.pending),
      function (state, action) {
        console.log(action.payload);
        state.isLoading = true;
      };
    builder.addCase(getAllProducts.rejected, function (state, action) {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getAllBrands.fulfilled, function (state, action) {
      console.log(action.payload);
      state.allBrands = action.payload;
    });
    builder.addCase(getAllBrands.pending, function (state, action) {
      console.log(action.payload);
      state.allBrands = action.payload;
    });
    builder.addCase(getAllBrands.rejected, function (state, action) {
      console.log(action.payload);
      state.allBrands = action.payload;
    });
  }
});

export default forkifySlice.reducer;
