import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public static async login({ auth, request, response }: HttpContextContract) {
    const { email, password, remember_me } = await request.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({ trim: true }, [rules.minLength(8)]),
        remember_me: schema.boolean.optional()
      })
    })

    try {
      await auth.use('web').attempt(email, password, remember_me)

      if (auth.user?.role === 'admin') {
        return response.redirect('/admin/dashboard')
      }

      return response.redirect('/dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public static async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/')
  }

  public static async adminLogout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    response.redirect('/admin')
  }

  // FIXME: This is a temporary solution
  public static async adminLogin({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/admin/dashboard')
    } catch (error) {
      return response.badRequest('Invalid credentials')
    }
  }
}
