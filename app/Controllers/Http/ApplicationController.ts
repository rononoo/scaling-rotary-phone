import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from 'App/Models/Application'
import User from 'App/Models/User'
import ApplicationsValidator from 'App/Validators/ApplicationsValidator'
import ApplicationEmail from 'App/Mailers/ApplicationEmail'

export default class ApplicationsController {
  public static async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: ApplicationsValidator.createSchema,
      messages: ApplicationsValidator.createMessages
    })

    const password = User.generatePassword()

    const userData = {
      title: data.title,
      email: data.email,
      phone: data.phone,
      lastName: data.lastName,
      firstName: data.firstName,
      maritalStatus: data.maritalStatus,
      password,
      language: request.ctx?.i18n?.locale
    }

    const applicationData = {
      loanType: data.loanType,
      loanAmount: data.loanAmount,
      loanDuration: data.loanDuration,
      employer: data.employer,
      occupation: data.occupation,
      income: data.income,
      comments: data.comments,
      acceptTerms: !!data.acceptTerms,
      acceptConditions: !!data.acceptConditions,
      trackingNumber: Application.generateTrackingNumber()
    }

    const user = auth.user || (await User.findBy('email', userData.email)) || (await User.create(userData))

    const application = await Application.create({ ...applicationData, userId: user.id })

    await application.load('user')

    await new ApplicationEmail(application, password).sendLater()

    // await new NewApplicationEmail(application).sendLater()

    return response.redirect('/success')
  }

  public static async show({ params, response }: HttpContextContract) {
    const application = await Application.findByOrFail('tracking_number', params.trackingNumber)

    await application.load('user')

    return response.ok({ application })
  }

  public static async showByUser({ params, response }: HttpContextContract) {
    const user = await User.findByOrFail('email', params.email)

    const applications = await Application.query().where('user_id', user.id).preload('user')

    return response.ok({ applications })
  }

  public static async edit({ params, response }: HttpContextContract) {
    const application = await Application.findByOrFail('tracking_number', params.trackingNumber)

    await application.load('user')

    return response.ok({ application })
  }

  public static async update({ params, request, response }: HttpContextContract) {
    const application = await Application.findByOrFail('tracking_number', params.trackingNumber)

    const data = await request.validate({
      schema: ApplicationsValidator.updateSchema,
      messages: ApplicationsValidator.updateMessages
    })

    application.merge(data)

    await application.save()

    return response.ok({ application })
  }

  public static async destroy({ params, response }: HttpContextContract) {
    const application = await Application.findByOrFail('tracking_number', params.trackingNumber)

    await application.delete()

    return response.noContent()
  }

  public static async index({ response }: HttpContextContract) {
    const applications = await Application.query().preload('user')

    return response.ok({ applications })
  }

  public static async destroyAll({ response }: HttpContextContract) {
    await Application.query().delete()

    return response.noContent()
  }

  public static async destroyAllByUser({ params, response }: HttpContextContract) {
    const user = await User.findByOrFail('email', params.email)

    await Application.query().where('user_id', user.id).delete()

    return response.noContent()
  }

  public static async destroyAllByUserId({ params, response }: HttpContextContract) {
    await Application.query().where('user_id', params.userId).delete()

    return response.noContent()
  }
}
