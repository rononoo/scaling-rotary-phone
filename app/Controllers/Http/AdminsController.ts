import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from 'App/Models/Application'
import ApplicationsValidator from 'App/Validators/ApplicationsValidator'

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
}
