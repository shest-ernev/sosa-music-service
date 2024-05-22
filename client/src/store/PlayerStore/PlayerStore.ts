import { MutableRefObject } from 'react'
import { makeAutoObservable } from 'mobx'
import { Track } from 'types/models/track'

export default class PlayerStore {
   trackList: Track[] = []
   defaultTrackList: Track[] = []
   currentAudio: number = 0
   play: boolean = false
   repeat: number = 0
   shuffle: boolean = false
   duration: number = 0
   currentTime: number = 0
   progress: number = 0
   volume: number = 1

   constructor() {
      makeAutoObservable(this)
   }

   setDuration = (value: number): void => {
      this.duration = value
   }

   setPlay = (value: boolean): void => {
      this.play = value
   }

   setRepeat = (value: number): void => {
      this.repeat = value
   }

   setVolume = (value: number) => {
      this.volume = value
   }

   setShuffle = (value: boolean): void => {
      this.shuffle = value

      if (value) {
         this.trackList = this.defaultTrackList.map((item) => item)

         const active = this.trackList.splice(this.currentAudio, 1)

         this.trackList = this.trackList.sort(() => Math.random() - 0.5)
         this.trackList.unshift(active[0])
         this.setCurrentAudio(0)
      } else {
         this.setCurrentAudio(this.defaultTrackList.indexOf(this.trackList[this.currentAudio]))
         this.trackList = this.defaultTrackList.map((item) => item)
      }
   }

   start = (index: number, list: Track[]): void => {
      this.defaultTrackList = list.map((item) => item)

      if (this.shuffle) {
         this.trackList = this.defaultTrackList.map((item) => item)

         const active = this.trackList.splice(index, 1)

         this.trackList = this.trackList.sort(() => Math.random() - 0.5)
         this.trackList.unshift(active[0])
         this.setCurrentAudio(0)
      } else {
         this.trackList = this.defaultTrackList.map((item) => item)
         this.setCurrentAudio(index)
      }

      this.setPlay(true)
   }

   setCurrentTime = (value: number): void => {
      this.currentTime = value
   }

   setProgress = (value: number): void => {
      this.progress = value
   }

   setCurrentAudio = (value: number): void => {
      this.currentAudio = value
   }

   rewindNext = (): void => {
      if (this.trackList[this.currentAudio + 1] === undefined && this.repeat !== 1) {
         return
      }

      if (this.trackList[this.currentAudio + 1] === undefined && this.repeat === 1) {
         this.setCurrentAudio(0)
      } else {
         this.setCurrentAudio(this.currentAudio + 1)
      }

      this.setProgress(0)
   }

   rewindPrev = (): void => {
      if (this.trackList[this.currentAudio - 1] === undefined && this.repeat !== 1) {
         return
      }

      if (this.trackList[this.currentAudio - 1] === undefined && this.repeat === 1) {
         this.setCurrentAudio(this.trackList.length - 1)
      } else {
         this.setCurrentAudio(this.currentAudio - 1)
      }

      this.setProgress(0)
   }

   onEnded = (ref: MutableRefObject<HTMLAudioElement | null>) => {
      if (ref.current === null) {
         return
      }

      if (this.trackList[this.currentAudio + 1] === undefined && this.repeat === 0) {
         return ref.current.pause()
      }

      if (this.trackList[this.currentAudio + 1] === undefined && this.repeat === 1) {
         this.setCurrentAudio(0)

         return this.setPlay(true)
      }

      if (this.repeat === 2) {
         ref.current.currentTime = 0

         return this.setPlay(true)
      }

      this.setCurrentAudio(this.currentAudio + 1)
      this.setPlay(true)
      this.setProgress(0)
   }

   onLoadedData = (ref: MutableRefObject<HTMLAudioElement | null>) => {
      if (!!ref.current) {
         this.setDuration(ref.current.duration)
      }

      if (this.play) {
         ref.current?.play()
      } else {
         ref.current?.pause()
      }
   }
}
