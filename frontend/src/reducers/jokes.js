import { createSlice } from '@reduxjs/toolkit'

const jokes = createSlice({
  name: 'jokes',
  initialState: {
    items: [
      {
        id: 1,
        message:
          'What kind of noise does a witch’s vehicle make? Brrrroooom, brrroooom.',
      },
      {
        id: 2,
        message: 'What’s brown and sticky? A stick',
      },
      {
        id: 3,
        message:
          'My wife asked me to stop singing “Wonderwall” to her. I said maybe…',
      },
      {
        id: 4,
        message: 'My boss told me to have a good day, so I went home.',
      },
    ],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default jokes
