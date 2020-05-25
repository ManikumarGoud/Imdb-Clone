export default [
    {
      name: '',
      path: '/',
      exact: true,
      component: require('../components/Views/MainPage').default,
    },
    {
      name: 'movie',
      path: '/movie/:id',
      component: require('../components/Views/Movie').default,
      routes: [
        {
          path: '/details',
          component: require('../components/Views/Movie/MovieDetail').default
        },
        {
          path: '/cast',
          component: require('../components/Views/Movie/CastList').default
        },
        {
          path: '/similar',
          component: require('../components/Views/Movie/SimilarMovies').default
        }
      ]
    },
    {
      name: 'person',
      path: '/person/:id',
      component: require('../components/Views/Person').default,
      routes: [
        {
          path: '/details',
          component: require('../components/Views/Person/PersonDetail').default
        },
        {
          path: '/movies',
          component: require('../components/Views/Person/MovieCredits').default
        },
      ]
    },
    {
      path: '/movies/trending',
      component: require('../components/Views/Movies/Trending').default
    },
    {
      path: '/movies/nowplaying',
      component: require('../components/Views/Movies/NowPlaying').default
    },
    {
      path: '/movies/toprated',
      component: require('../components/Views/Movies/TopRated').default
    },
    {
      path: '/movies/upcoming',
      component: require('../components/Views/Movies/Upcoming').default
    }
  ];