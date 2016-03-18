import DatabaseWrapper from 'database/wrapper'
import {
  DATABASE_ALL_DBS_RESULT,
  DATABASE_ALL_DOCS_RESULT,
  DATABASE_GET_DOC_RESULT,
  DATABASE_REPLICATION_CHANGE,
  DATABASE_REPLICATION_STARTED,
  DATABASE_SET_CONFIGURATION
} from './constants'
import { handleActions } from 'redux-actions'

// Default values for state array.
const defaults = {
  allDBsResult: [],
  allDocsResult: {},
  getDocResults: {},
  wrapper: new DatabaseWrapper()
}

export default handleActions({
  [DATABASE_ALL_DBS_RESULT]: (state, { payload }) => {
    return {
      ...state,
      allDBsResult: payload
    }
  },

  [DATABASE_ALL_DOCS_RESULT]: (state, { payload }) => {
    return {
      ...state,
      allDocsResult: payload
    }
  },

  [DATABASE_GET_DOC_RESULT]: (state, { payload }) => {
    return {
      ...state,
      getDocResults: {
        ...state.getDocResults,
        [payload._id]: payload
      }
    }
  },

  [DATABASE_REPLICATION_CHANGE]: (state, { payload }) => {
    return {
      ...state,
      replication_last_seq: payload.last_seq
    }
  },

  [DATABASE_REPLICATION_STARTED]: (state, { payload }) => {
    return {
      ...state,
      // Since replication was (re)-started, we no longer know the
      // correct value here.
      replication_last_seq: undefined
    }
  },

  [DATABASE_SET_CONFIGURATION]: (state, { payload }) => {
    state.wrapper.setConfiguration(payload)

    // Save the config on the state, so components can react to it changing.
    return {
      ...state,
      configuration: payload
    }
  }
}, defaults)
