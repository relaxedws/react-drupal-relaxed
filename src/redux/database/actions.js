import {
  DATABASE_ALL_DBS_REQUESTED,
  DATABASE_ALL_DBS_RESULT,
  DATABASE_ALL_DOCS_RESULT,
  DATABASE_GET_DOC_RESULT,
  DATABASE_REPLICATION_CHANGE,
  DATABASE_REPLICATION_COMPLETE,
  DATABASE_REPLICATION_STARTED,
  DATABASE_SET_CONFIGURATION
} from './constants'
import { createAction } from 'redux-actions'

export const allDBsResult = createAction(DATABASE_ALL_DBS_RESULT)
export const allDocsResult = createAction(DATABASE_ALL_DOCS_RESULT)
export const getAllDBs = createAction(DATABASE_ALL_DBS_REQUESTED)
export const getAllDocs = () => {
  return (dispatch, getState) => {
    const state = getState()

    state.database.wrapper.allDocs().then((result) => {
      dispatch(allDocsResult(result))
    }).catch((err) => {
      console.error(err)
    })
  }
}
export const getDoc = (entityId) => {
  return (dispatch, getState) => {
    const state = getState()

    state.database.wrapper.get(entityId).then((doc) => {
      dispatch(getDocResult(doc))
    }).catch((err) => {
      console.error(err)
    })
  }
}
export const getDocResult = createAction(DATABASE_GET_DOC_RESULT)
export const replicationChange = createAction(DATABASE_REPLICATION_CHANGE)
export const replicationComplete = createAction(DATABASE_REPLICATION_COMPLETE)
export const replicationStarted = createAction(DATABASE_REPLICATION_STARTED)
export const setConfiguration = createAction(DATABASE_SET_CONFIGURATION)

// Action creators normally used in components. Careful about name
// collisions here.
export const actions = {
  getAllDBs,
  getAllDocs,
  getDoc,
  replicationChange,
  replicationComplete,
  replicationStarted,
  setConfiguration
}
