import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from 'App/Models/Application'
import ApplicationsValidator from 'App/Validators/ApplicationsValidator'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AdminController {
  public static async index({ view }: HttpContextContract) {
    const applications = await Application.query().preload('user')

    return view.render('admin/dashboard', { applications })
  }

  public static async show({ view, params }: HttpContextContract) {
    const application = await Application.findOrFail(params.id)

    await application.load('user')

    return view.render('admin/application', { application })
  }

  public static async destroy({ response, params }: HttpContextContract) {
    const application = await Application.findOrFail(params.id)

    await application.delete()

    return response.redirect('/admin/dashboard')
  }

  public static async update({ response, request, params }: HttpContextContract) {
    const application = await Application.findOrFail(params.id)

    const data = await request.validate({
      schema: ApplicationsValidator.updateSchema,
      messages: ApplicationsValidator.updateMessages
    })

    console.log(request.all())

    application.merge(data)

    await application.save()

    return response.redirect('/admin/application/' + application.id)
  }

  public static async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({ trim: true }, [rules.minLength(8)])
      })
    })

    try {
      await auth.use('web').attempt(email, password)

      if (auth.user?.role === 'admin') {
        return response.redirect('/admin/dashboard')
      }

      return response.redirect('/dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
