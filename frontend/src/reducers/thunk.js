import { user } from './user'

export const getSecretMessage = () => {
  const URL = 'https://project-auth-cla-ellen.herokuapp.com/secret'

  return (dispatch, accessToken) => {
    //const accessToken = getStore().user.login.accessToken
    //const userId = getStore().user.login.userId
    //`${URL}/${userId}/secret`
    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'You do not have access to this page'
        }
        return res.json() 
      })
      .then((json) => {
        dispatch(
          user.actions.setStatusMessage({
            statusMessage: JSON.stringify(json).slice(1, -1) 
          })
        )
      })
      .catch((error) => {
        dispatch(
          user.actions.setStatusMessage({
            statusMessage: error
          })
        )
      })
  }
}