import { all, takeLatest, call, put } from 'redux-saga/effects';

import { ToolsService } from '../../../services/index.js';

import { Creators as ToolsActions } from '../../ducks/tools';
import { Types as TypesActions } from '../../ducks/tools';

export function* getTools() {
  try {
    const { data } = yield call(ToolsService.list);
    yield put(ToolsActions.getToolsSuccess(data));
  } catch (err) {
    console.log('getTools err: ', err);
  }
}

export function* addTool({ tool }) {
  try {
    const data = yield call(ToolsService.post, tool);
    yield put(ToolsActions.addToolSuccess(data));
  } catch (err) {
    console.log('addTool err: ', err);
  }
}

export function* deleteTool({ id }) {
  try {
    const { data } = yield call(ToolsService.delete, id);
    yield put(ToolsActions.deleteToolSuccess(id));
  } catch (err) {
    console.log('deleteTool err: ', err);
  }
}

export default function* toolsSaga() {
  yield all([
    takeLatest(TypesActions.GET_TOOLS, getTools),
    takeLatest(TypesActions.ADD_TOOL, addTool),
    takeLatest(TypesActions.DELETE_TOOL, deleteTool)
  ]);
}
