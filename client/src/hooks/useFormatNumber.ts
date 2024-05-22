type RangesType = {
   divider: number
   suffix: string
}

export const useFormatNumber = (n: number): string => {
   const ranges: RangesType[] = [
      { divider: 1e18, suffix: ' квнтлн.' },
      { divider: 1e15, suffix: ' квдрл.' },
      { divider: 1e12, suffix: ' трлн.' },
      { divider: 1e9, suffix: ' млрд.' },
      { divider: 1e6, suffix: ' млн.' },
      { divider: 1e3, suffix: ' тыщ.' },
   ]

   for (let i = 0; i < ranges.length; i++) {
      if (n >= ranges[i].divider) {
         return (n / ranges[i].divider).toFixed(1) + ranges[i].suffix
      }
   }

   return n.toString()
}
