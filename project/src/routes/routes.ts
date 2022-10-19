const HOME_URL = '/game-Info/'

export const ROUTES = {
  HOME: HOME_URL,
  GAME:`${HOME_URL}game/:id`,
  FAVOURITES: `${HOME_URL}favourites/:page`,
  SEARCH:`${HOME_URL}search/:name/:page`,
  LOGIN:`${HOME_URL}login`,
  REGISTER:`${HOME_URL}register`,
}