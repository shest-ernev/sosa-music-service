export const useTimeFormat = (time: number) => {
   const timeSec = time % 60
   const timeMin = time / 60

   if (timeMin < 10 && timeSec < 10) {
      return `0${timeMin.toFixed(0)}:0${timeSec.toFixed(0)}`
   }

   if (timeMin < 10) {
      return `0${timeMin.toFixed(0)}:${timeSec.toFixed(0)}`
   }

   if (timeSec < 10) {
      return `${timeMin.toFixed(0)}:0${timeSec.toFixed(0)}`
   }

   return `${timeMin}:${timeSec}`
}
