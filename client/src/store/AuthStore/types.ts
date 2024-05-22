export type RequestSignInValue = {
   login: string
   password: string
}

export type RequestSignUpValue = {
   name: string
   login: string
   password: string
   confirmPassword?: string
   agreement?: boolean
}

export type AuthRes = {
   msg: string
   token: string
}