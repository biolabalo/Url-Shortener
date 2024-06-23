/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [ UsersController, 'register']).as('auth.register')
router.post('/login', [ UsersController, 'login']).as('auth.login')
router.delete('/logout', [ UsersController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [ UsersController, 'me']).as('auth.me')
// router.get('/:shortUrl', 'UrlController.redirect')