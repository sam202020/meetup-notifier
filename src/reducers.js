import { createReducer } from "redux-starter-kit";
import { request, receive } from "./actions";

export const rootReducer = createReducer(
  { meetupsStatus: null, meetups: null },
  {
    [request]: (state, action) => (state.meetupsStatus = "request"),
    [receive]: (state, action) => {
      state.meetupsStatus = "resolve";
      state.meetups = action.meetups;
      state.lastUpdated = action.receivedAt;
    }
  }
);
