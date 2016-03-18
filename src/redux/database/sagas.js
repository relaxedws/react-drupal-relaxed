import {
  DATABASE_SET_CONFIGURATION
} from './constants'
import { actions as databaseActions } from './actions'
import { apply, call, put, take } from 'redux-saga'
import { createChannel } from '../channels'

function createChangeChannel (replication) {
  const channel = createChannel()

  // every change event will call put on the channel
  replication.on('change', channel.put)
  return channel
}

function * monitorChangeEvents (channel) {
  while (true) {
    const info = yield call(channel.take) // Blocks until the promise resolves
    yield put(databaseActions.replicationChange(info))
  }
}

/**
 * Saga to start replication, when database configuration is set.
 */
function * startReplication (getState) {
  // Wait for the configuration to be set. This can happen multiple
  // times during the life cycle, for example when the user wants to
  // switch database/workspace.
  while (yield take(DATABASE_SET_CONFIGURATION)) {
    let state = getState()
    let wrapper = state.database.wrapper

    // Wait for a connection to work.
    yield apply(wrapper, wrapper.connect)

    // Trigger replication, and keep the promise.
    let replication = wrapper.replicate()

    if (replication) {
      yield put(databaseActions.replicationStarted())
      yield call(monitorChangeEvents, createChangeChannel(replication))
    }
  }
}

// Export the sagas we provide.
export { startReplication }
