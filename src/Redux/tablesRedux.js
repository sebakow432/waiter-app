import { API_URL } from "../config";

//selectors
export const getTableById = ({ tables }, tableId) => tables.find(tables => tables.id === tableId);
export const getAllTables =({ tables }) => tables;

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const SHOW_TABLE = createActionName('SHOW_TABLE');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const showTables = payload =>({type: SHOW_TABLE, payload});
export const updateTable = payload => ({ type: UPDATE_TABLE, payload })

// thunks
export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then((res) => res.json())
      .then((tables) => dispatch(showTables(tables)));
  };
};

export const updateTableRequest = (data) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`${API_URL}/tables/${data.id}}`, options)
      .then((res) => res.json())
      .then((data) => dispatch(updateTable(data)));
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case SHOW_TABLE:
      return [...action.payload]

    case UPDATE_TABLE:
      return statePart.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
        
    default:
      return statePart;
  };
};
export default tablesReducer;