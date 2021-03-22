import { mutations } from '@/store/index.js'
// setInitialFavoritePlaces
test('setInitialFavoritePlaces_userName_[]', () => {
  const state = {
    favoritePlaces: {}
  }

  mutations.setInitialFavoritePlaces(state, 'userName')
  expect(state.favoritePlaces.userName).toEqual([])
})
// checkShowFavorite
test('checkShowFavorite_milanHasAlreadyBeenAdded', () => {
  const state = {
    favoritePlaces: {
      Vlad: ['milan']
    },
    userEmail: 'some@mail.ru',
    userName: 'Vlad',
    addToFavoriteShow: false
  }
  mutations.checkShowFavorite(state, 'Milan')
  expect(state.addToFavoriteShow).toBe(false)
})
test('checkShowFavorite_milanHasNeverBeenAdded', () => {
  const state = {
    favoritePlaces: {
      Vlad: ['']
    },
    userEmail: 'some@mail.ru',
    userName: 'Vlad',
    addToFavoriteShow: false
  }
  mutations.checkShowFavorite(state, 'Milan')
  expect(state.addToFavoriteShow).toBe(true)
})
// addToFavorite
test('addToFavotie_Milan', () => {
  const state = {
    favoritePlaces: {
      Vlad: ['moscow']
    },
    userEmail: 'some@mail.ru',
    userName: 'Vlad',
    addToFavoriteShow: false
  }
  mutations.addToFavorite(state, 'milan')
  expect(state.favoritePlaces['Vlad'].includes('milan')).toBe(true)
})
