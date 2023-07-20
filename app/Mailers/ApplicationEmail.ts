import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import Application from 'App/Models/Application'
import mjml from 'mjml'
import Env from '@ioc:Adonis/Core/Env'

export default class ApplicationEmail extends BaseMailer {
  constructor(
    private readonly application: Application,
    private readonly password: string
  ) {
    super()
  }

  locales = {
    de: {
      title: 'Ihre Bewerbung wurde erhalten',
      template: 'emails/new-application/de'
    },
    en: {
      title: 'Your application has been received',
      template: 'emails/new-application/en'
    },
    es: {
      title: 'Su solicitud ha sido recibida',
      template: 'emails/new-application/es'
    },
    fr: {
      title: 'Votre demande a été reçue',
      template: 'emails/new-application/fr'
    },
    it: {
      title: 'La tua domanda è stata ricevuta',
      template: 'emails/new-application/it'
    },
    nl: {
      title: 'Uw aanvraag is ontvangen',
      template: 'emails/new-application/nl'
    },
    pt: {
      title: 'Seu pedido foi recebido',
      template: 'emails/new-application/pt'
    }
  }

  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  public html = mjml(
    View.renderSync(this.locales[this.application.user.language].template, {
      firstName: this.application.user.firstName,
      lastName: this.application.user.lastName,
      linkContact: `mailto:${Env.get('SMTP_FROM_MAIL')}`,
      linkFollow: `${Env.get('APP_URL')}/login`,
      linkPrivacy: `${Env.get('APP_URL')}/privacy-policy`,
      linkTerms: `${Env.get('APP_URL')}/terms-conditions`,
      linkLogo: `${Env.get('APP_URL')}/img/bkr-kredit.png`,
      loanType: this.application.loanType,
      loanAmount: this.application.loanAmount,
      loanDuration: this.application.loanDuration,
      status: this.application.status,
      trackingNumber: this.application.trackingNumber,
      email: this.application.user.email,
      password: this.password
    })
  ).html

  /**
   * The prepare method is invoked automatically when you run
   * "NewApplication.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject(this.locales[this.application.user.language].title)
      .replyTo(Env.get('SMTP_FROM_MAIL'))
      .encoding('utf-8')
      .priority('high')
      .cc(Env.get('SMTP_FROM_MAIL'))
      .bcc(Env.get('SMTP_FROM_MAIL'))
      .from(Env.get('SMTP_FROM_MAIL'), Env.get('SMTP_FROM_NAME'))
      .to(this.application.user.email)
      .html(this.html)
  }
}
