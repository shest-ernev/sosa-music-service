export type User = {
   _id: string
   name: string
   login: string
   cover: string
   avatar: string
   admin: boolean
   likes?: number
   like?: boolean
   loading?: boolean
}
