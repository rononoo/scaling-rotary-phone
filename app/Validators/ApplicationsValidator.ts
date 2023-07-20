import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'

const ApplicationsValidator = {
  createSchema: schema.create({
    title: schema.enum(['mr', 'mrs', 'ms', 'dr', 'prof']),
    lastName: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(255)]),
    firstName: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(255)]),
    maritalStatus: schema.enum(['single', 'married', 'divorced', 'widowed']),
    email: schema.string({ trim: true }, [rules.email()]),
    phone: schema.string({ trim: true }),
    loanType: schema.enum(['personal', 'holidays', 'automobile', 'real-state', 'weeding', 'consolidation', 'other']),
    loanAmount: schema.number([rules.range(1000, 999999999.99)]),
    loanDuration: schema.number([rules.range(1, 120)]),
    employer: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(255)]),
    occupation: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(255)]),
    income: schema.number([rules.range(0, 99999999.99)]),
    comments: schema.string.optional(),
    acceptTerms: schema.enum(['YES']),
    acceptConditions: schema.enum(['YES'])
  }),
  createMessages: {
    'email.unique': "L'email est déjà utilisé.",
    'title.enum': "Le titre doit être 'mr', 'mrs', 'ms', 'dr' ou 'prof'.",
    'lastName.string': 'Le nom de famille doit être une chaîne de caractères.',
    'lastName.minLength': 'Le nom de famille doit comporter au moins 2 caractères.',
    'lastName.maxLength': 'Le nom de famille doit comporter au maximum 255 caractères.',
    'firstName.string': 'Le prénom doit être une chaîne de caractères.',
    'firstName.minLength': 'Le prénom doit comporter au moins 2 caractères.',
    'firstName.maxLength': 'Le prénom doit comporter au maximum 255 caractères.',
    'maritalStatus.enum': "Le statut matrimonial doit être 'single', 'married', 'divorced' ou 'widowed'.",
    'email.string': "L'email doit être une chaîne de caractères.",
    'email.email': "L'email doit être une adresse email valide.",
    'phone.string': 'Le numéro de téléphone doit être une chaîne de caractères.',
    'phone.mobile': 'Le numéro de téléphone doit être un numéro de téléphone mobile valide.',
    'loanType.enum':
      "Le type de prêt doit être 'personal', 'holidays', 'automobile', 'real-state', 'weeding', 'consolidation' ou 'other'.",
    'loanAmount.number': 'Le montant du prêt doit être un nombre.',
    'loanAmount.range': 'Le montant du prêt doit être compris entre 1000 et 999999.99.',
    'loanDuration.number': 'La durée du prêt doit être un nombre.',
    'loanDuration.range': 'La durée du prêt doit être comprise entre 1 et 84.',
    'employer.string': "L'employeur doit être une chaîne de caractères.",
    'employer.minLength': "L'employeur doit comporter au moins 2 caractères.",
    'employer.maxLength': "L'employeur doit comporter au maximum 255 caractères.",
    'occupation.string': "L'occupation doit être une chaîne de caractères.",
    'occupation.minLength': "L'occupation doit comporter au moins 2 caractères.",
    'occupation.maxLength': "L'occupation doit comporter au maximum 255 caractères.",
    'income.number': 'Le revenu doit être un nombre.',
    'income.range': 'Le revenu doit être compris entre 0 et 99999999.99.',
    'comments.string': 'Les commentaires doivent être une chaîne de caractères.',
    'acceptTerms.enum': 'Vous devez accepter les termes.',
    'acceptConditions.enum': 'Vous devez accepter les conditions.'
  },

  updateSchema: schema.create({
    progress: schema.number.optional([rules.range(0, 100)])
  }),

  updateMessages: {
    'progress.number': 'Le progrès doit être un nombre.',
    'progress.range': 'Le progrès doit être compris entre 0 et 100.'
  },
  reporter: validator.reporters.api
}

export default ApplicationsValidator
