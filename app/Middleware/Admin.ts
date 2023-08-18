import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    // Log the auth object to see its properties
    console.log('auth object:', auth);

    // Check if the user is logged in
    if (!auth.isLoggedIn) {
      console.log('User is not logged in');
      return response.redirect('/admin/login'); // Redirect to login if not logged in
    }

    // Log the authenticated user (for debugging)
    console.log('Authenticated user:', auth.user);

    // Check user's role
    if (auth.user?.role !== 'admin') {
      console.log('User is not an admin');
      return response.redirect('/unauthorized');
    }

    // Continue to the next middleware
    await next();
  }
}
