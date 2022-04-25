import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  announcements: [],
  events: [],
  issues: [],
  uploads: [],
  complains: [],
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setAnnouncements(state, payload) {
      state.announcements = payload.payload;
    },
    setEvents(state, payload) {
      state.events = payload.payload;
    },
    setIssues(state, payload) {
      state.issues = payload.payload;
    },
    setUploads(state, payload) {
      state.uploads = payload.payload;
    },
    setComplains(state, payload) {
      state.complains = payload.payload;
    },
  },
});

export const ActionActions = actionSlice.actions;
export default actionSlice.reducer;
