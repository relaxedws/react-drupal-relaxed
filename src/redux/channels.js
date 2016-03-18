export function createChannel () {
  const messageQueue = []
  const resolveQueue = []

  function put (msg) {
    // anyone waiting for a message ?
    if (resolveQueue.length) {
      // deliver the message to the oldest one waiting (First In First Out)
      const nextResolve = resolveQueue.shift()
      nextResolve(msg)
    } else {
      // no one is waiting ? queue the event
      messageQueue.push(msg)
    }
  }

  // returns a Promise resolved with the next message
  function take () {
    // do we have queued messages ?
    if (messageQueue.length) {
      // deliver the oldest queued message
      return Promise.resolve(messageQueue.shift())
    } else {
      // no queued messages ? queue the taker until a message arrives
      return new Promise((resolve) => resolveQueue.push(resolve))
    }
  }

  return {
    take,
    put
  }
}
