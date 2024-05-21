import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteStoryById,
  getStoryById,
  getStorys,
  getStorysByUserId,
  saveStory,
  updateStoryById,
} from "../actions/story.actions";

const getStoryByIdFunc = (storys, storyId) => {
  const result = storys.filter(function (el) {
    return el.id === storyId;
  });

  return result ? result[0] : null; // or undefined
};

const storySlice = createSlice({
  name: "story",
  initialState: {
    selectedStory: null,
    storys: [],
  },
  reducers: {
    getStoryToShareById: (state, action) => {
      state.selectedStory = getStoryByIdFunc(state.storys, action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveStory.fulfilled, (state, action) => {
      state.storys = [...state.storys, action.payload];
      toast.success("Story Added");
    });
    builder.addCase(saveStory.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getStoryById.fulfilled, (state, action) => {
      state.selectedStory = action.payload;
    });
    builder.addCase(getStoryById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getStorys.fulfilled, (state, action) => {
      state.storys = action.payload;
    });
    builder.addCase(getStorys.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getStorysByUserId.fulfilled, (state, action) => {
      state.storys = action.payload;
    });
    builder.addCase(getStorysByUserId.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(updateStoryById.fulfilled, (state, action) => {
      state.storys = state.storys.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
      toast.success("Story Edited");
    });
    builder.addCase(updateStoryById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(deleteStoryById.fulfilled, (state, action) => {
      state.storys = state.storys.filter((x) => x.id !== action.payload);
      toast.success("Story Deleted");
    });
    builder.addCase(deleteStoryById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
  },
});

export const { getStoryToShareById } = storySlice.actions;

export default storySlice.reducer;
