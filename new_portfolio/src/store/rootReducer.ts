import { combineReducers } from "@reduxjs/toolkit";

import TerminalReducer from "./terminalReducer";

const rootReducer = combineReducers({
  terminal: TerminalReducer,
});

export default rootReducer;
