import {
  DATABASE_ALL_DBS_SUCCESS,
  DATABASE_ALL_DOCS_SUCCESS,
  DATABASE_GET_DOC_SUCCESS,
  DATABASE_REPLICATION_CHANGE,
  DATABASE_REPLICATION_COMPLETE,
  DATABASE_REPLICATION_STARTED,
  DATABASE_SET_CONFIGURATION
} from './constants'
import { createAction } from 'redux-actions'

export const allDBsSuccess = createAction(DATABASE_ALL_DBS_SUCCESS)
export const allDocsSuccess = createAction(DATABASE_ALL_DOCS_SUCCESS)
export const getAllDBs = () => {
  return (dispatch, getState) => {
    const state = getState()

    state.database.wrapper.allDBs().then((result) => {
      dispatch(allDBsSuccess(result))
    }).catch((err) => {
      console.error(err)
    })
  }
}
export const getAllDocs = () => {
  return (dispatch, getState) => {
    const state = getState()

    state.database.wrapper.allDocs().then((result) => {
      dispatch(allDocsSuccess(result))
    }).catch((err) => {
      console.error(err)
    })
  }
}
export const getDoc = (entityId) => {
  return (dispatch, getState) => {
    const state = getState()

    state.database.wrapper.get(entityId).then((doc) => {
      dispatch(getDocSuccess(doc))
    }).catch((err) => {
      console.error(err)
    })
  }
}
export const getDocSuccess = createAction(DATABASE_GET_DOC_SUCCESS)
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
