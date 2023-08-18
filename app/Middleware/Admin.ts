import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = await auth.use('web').authenticate()

    // Check user's role
    if (user?.role !== 'admin') return response.redirect('/unauthorized');

    // Continue to the next middleware
    await next();
  }
}
