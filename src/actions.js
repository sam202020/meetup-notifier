import fetch from 'cross-fetch'
import { createAction } from 'redux-starter-kit';

export const request = createAction('meetups/request');

export const receive = 'meetups/receive';

console.log(receive.toString());

function receiveMeetups(json) {
  console.log(json)
  return {
    type: receive,
    meetups: [],
    receivedAt: Date.now()
  }
}

export function fetchMeetups() {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
  
    return function(dispatch) {
      // First dispatch: the app state is updated to inform
      // that the API call is starting.
  
      dispatch(request)
  
      // The function called by the thunk middleware can return a value,
      // that is passed on as the return value of the dispatch method.
  
      // In this case, we return a promise to wait for.
      // This is not required by thunk middleware, but it is convenient for us.
  
      return fetch(`https://api.meetup.com/find/groups?zip=11211&radius=1&category=25&order=members&key=15c31705b7a3d1a7a316d895e6229`)
        .then(
          response => response.json(),
          // Do not use catch, because that will also catch
          // any errors in the dispatch and resulting render,
          // causing a loop of 'Unexpected batch number' errors.
          // https://github.com/facebook/react/issues/6895
          error => console.log('An error occurred.', error)
        )
        .then(json =>
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
  
          dispatch(receiveMeetups(json))
        )
    }
  }