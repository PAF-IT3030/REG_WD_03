import { createAsyncThunk } from "@reduxjs/toolkit";
import { STORYAPI } from "../apis/story.api";

export const saveStory = createAsyncThunk("story/saveStory", async (data) => {
  const response = await STORYAPI.saveStory(data);
  return response.data;
});

export const getStorys = createAsyncThunk("story/getStorys", async () => {
  const response = await STORYAPI.getStorys();
  return response.data;
});

export const getStoryById = createAsyncThunk("story/getStoryById", async (id) => {
  const response = await STORYAPI.getStoryById(id);
  return response.data;
});

export const getStorysByUserId = createAsyncThunk("story/getStorysByUserId",
  async (id) => {
    const response = await STORYAPI.getStorysByUserId(id);
    return response.data;
  }
);

export const updateStoryById = createAsyncThunk(
  "story/updateStoryById",
  async (data) => {
    const response = await STORYAPI.updateStoryById(data.id, data);
    return response.data;
  }
);

export const deleteStoryById = createAsyncThunk(
  "story/deleteStoryById",
  async (id) => {
    const response = await STORYAPI.deleteStoryById(id);
    return id;
  }
);
