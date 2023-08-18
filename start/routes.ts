/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AdminController from 'App/Controllers/Http/AdminsController'
import ApplicationController from 'App/Controllers/Http/ApplicationController'
import AuthController from 'App/Controllers/Http/AuthController'

Route.get('/', async ({ view }) => view.render('home'))
Route.get('/ask-for-loan', async ({ view }) => view.render('ask-for-loan'))
Route.get('/services', async ({ view }) => view.render('services'))
Route.get('/terms-conditions', async ({ view }) => view.render('terms-conditions'))
Route.get('/privacy-policy', async ({ view }) => view.render('privacy-policy'))

Route.get('/login', async ({ view, auth }) => view.render(auth.isLoggedIn ? 'dashboard' : 'login'))
Route.post('/login', AuthController.login)

Route.group(() => {
  Route.get('/', ApplicationController.index).middleware('admin')
  Route.post('/', ApplicationController.store)
  Route.get('/:id', ApplicationController.show).middleware('admin')
  Route.put('/:id', ApplicationController.update).middleware('admin')
  Route.delete('/:id', ApplicationController.destroy).middleware('admin')
}).prefix('/applications')

Route.group(() => {
  Route.get('/dashboard', async ({ view, auth }) =>
    view.render('dashboard', {
      user: auth.user,
      applications: await auth.user?.related('applications').query()
    })
  )
  Route.get('/logout', AuthController.logout)
}).middleware('auth')

Route.get('/success', async ({ view }) => view.render('success'))

Route.group(() => {
  Route.get('/admin/application/:id', AdminController.show)
  Route.get('/admin/application/:id/delete', AdminController.destroy)
  Route.post('/admin/application/:id', AdminController.update)
  Route.get('/admin/dashboard', AdminController.index)
  Route.get('/admin/logout', AuthController.adminLogout)
}).middleware('admin')

Route.get('admin', async ({ view, auth }) => view.render(auth.isLoggedIn ? 'admin/dashboard' : 'admin/login'))
