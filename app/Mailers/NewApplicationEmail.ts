import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import Application from 'App/Models/Application'
import mjml from 'mjml'
import Env from '@ioc:Adonis/Core/Env'

export default class NewApplicationEmail extends BaseMailer {
    constructor(private readonly application: Application) {
        super()
    }

    /**
     * WANT TO USE A DIFFERENT MAILER?
     *
     * Uncomment the following line of code to use a different
     * mailer and chain the ".options" method to pass custom
     * options to the send method
     */
    public html = mjml(
        View.renderSync('emails/new-application/admin', {
            loanType: this.application.loanType,
            loanAmount: this.application.loanAmount,
            loanDuration: this.application.loanDuration,
            email: this.application.user.email
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
            .subject("Nouvelle demande de près sur BKR Kredit")
            .encoding('utf-8')
            .priority('high')
            .to(Env.get('SMTP_FROM_MAIL'))
            .html(this.html)
    }
}
