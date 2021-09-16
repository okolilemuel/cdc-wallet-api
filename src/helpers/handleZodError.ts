import { ZodError } from 'zod'

export default (zodError: ZodError): Error => {
    let message
    if (zodError.issues) {
        switch (zodError.issues[0].code) {
            case 'invalid_type':
                message = handleInvalidType(zodError.issues[0])
                break
            default:
                break
        }
    }
    const error = new Error(message || zodError.issues[0].message)
    error.name = 'ValidationError'
    return error
}

const handleInvalidType = (issue: Record<string, any>) => {
    if (issue.received === 'undefined') return `${issue.path[0]} is required`
    return `expected ${issue.path[0]} to be of type ${issue.expected}`
}
