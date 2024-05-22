import { makeAutoObservable } from 'mobx'

export default class SearchStore {
   search: string = ''
   genres: string[] = []

   constructor() {
      makeAutoObservable(this)
   }

   setSearch = (value: string): void => {
      this.search = value
   }

   addGenre = (item: string) => {
      this.genres.push(item)
   }

   delGenre = (item: string) => {
      this.genres = this.genres.filter((el) => el !== item)
   }

   setGenres = (arr: any) => {
      this.genres = arr
   }
}
