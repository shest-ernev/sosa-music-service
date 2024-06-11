export const useTimeFormat = (time: number) => {
   const timeSec = Math.floor(time % 60)
   const timeMin = Math.floor(time / 60)

   if (timeMin < 10 && timeSec < 10) {
      return `0${timeMin}:0${timeSec}`
   }

   if (timeMin < 10) {
      return `0${timeMin}:${timeSec}`
   }

   if (timeSec < 10) {
      return `${timeMin}:0${timeSec}`
   }

   return `${timeMin}:${timeSec}`
}
