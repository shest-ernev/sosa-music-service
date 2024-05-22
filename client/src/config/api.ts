const api = {
   auth: {
      signIn: '/auth/login',
      singUp: '/auth/register',
      getAuth: '/auth/get',
   },
   profile: {
      getProfile: '/profile',
      setAvatar: '/profile/avatar',
      delAvatar: '/profile/avatar',
      setCover: '/profile/cover',
      delCover: '/profile/cover',
      editData: '/profile',
      editPassword: '/profile/password',
   },
   user: {
      getUser: (login: string) => `/user/${login}`,
      setLike: (id: string) => `/user/like/${id}`,
      getUsers: (query?: string) => `/users/all${query}`,
   },
   album: {
      getAlbums: (query: string) => `/albums/${query}`,
      getEditAlbum: (id: string) => `/album/edit/${id}`,
      create: (query: string) => `/album?${query}`,
      setLike: (id: string) => `/album/like/${id}`,
      getAlbum: (id: string) => `/album/${id}`,
      setCover: (id: string) => `/album/cover/${id}`,
      setName: (id: string) => `/album/name/${id}`,
      setStatus: (id: string) => `/album/status/${id}`,
      delAlbum: (id: string) => `/album/${id}`
   },
   track: {
      addTrack: (id: string, query: string) => `/track/${id}?${query}`,
      delTrack: (id: string) => `/track/${id}`,
      setLike: (id: string) => `/track/like/${id}`,
      getTracks: (query: string) => `/tracks/all${query}`
   },
   library: {
      getTracks: (query?: string) => `/library/tracks${query}`,
      getUsers: (query?: string) => `/library/users${query}`,
      getAlbums: (query?: string) => `/library/albums${query}`,
   }
}

export default api
