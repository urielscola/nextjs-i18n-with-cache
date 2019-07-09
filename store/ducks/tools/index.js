export const Types = {
  GET_TOOLS: 'tools/GET_TOOLS',
  GET_TOOLS_SUCCESS: 'tools/GET_TOOLS_SUCCESS',

  ADD_TOOL: 'tools/ADD_TOOL',
  ADD_TOOL_SUCCESS: 'tools/ADD_CARD_SUCCESS',

  DELETE_TOOL: 'tools/DELETE_TOOL',
  DELETE_TOOL_SUCCESS: 'tools/DELETE_TOOL_SUCCESS'
};

const INITIAL_STATE = {
  list: [{
    id: 1,
    title: 'TOol 1',
    description: 'Description',
    tags: ['Opa']
  }],
  loading: false
};

export const Creators = {
  getTools: () => ({ type: Types.GET_TOOLS }),
  getToolsSuccess: payload => ({
    type: Types.GET_TOOLS_SUCCESS,
    payload
  }),

  addTool: fields => ({ type: Types.ADD_TOOL, payload: { fields } }),
  addToolSuccess: payload => ({
    type: Types.ADD_TOOL_SUCCESS,
    payload
  }),

  deleteTool: id => ({ type: Types.DELETE_TOOL, payload: { id } }),
  deleteToolSuccess: id => ({
    type: Types.DELETE_TOOL_SUCCESS,
    payload: { id }
  })
};

export default function tools(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.GET_TOOLS:
      return { ...state, loading: true };

    case Types.GET_TOOLS_SUCCESS:
      return { ...state, list: payload, loading: false };

    case Types.ADD_TOOL:
      return { ...state, loading: true };

    case Types.ADD_TOOL_SUCCESS:
      return {
        ...state,
        list: [...state.list, { ...payload.data }],
        loading: false
      };

    case Types.DELETE_TOOL:
      return { ...state, loading: true };

    case Types.DELETE_TOOL_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== payload.id),
        loading: false
      };

    default:
      return state;
  }
}
