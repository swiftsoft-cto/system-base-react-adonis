/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
*/
import Route from '@ioc:Adonis/Core/Route'

//Autenticação
Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout')
  Route.get('validate-token', 'AuthController.validateToken')
}).prefix('api')

//Mail
Route.group(() => {
  Route.post('send-mail', 'MailController.sendMail')
}).prefix('api')

//Usuário
Route.group(() => {
  Route.get('user-settings', 'UserController.userSettings')
  Route.post('access-level', 'UserController.accessLevel')
}).prefix('api')
.middleware('auth')