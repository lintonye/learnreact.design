import MarioPoster from './assets/student-kevin-cannon-mario.mp4.jpg'
import AppBarPoster from './assets/student-fabrizio-app-bar.mp4.jpg'
import SpotifyPoster from './assets/student-lichin-spotify.mp4.jpg'
import AppBarVideo from './assets/student-fabrizio-app-bar.mp4'
import SpotifyVideo from './assets/student-lichin-spotify.mp4'
import MarioVideo from './assets/student-kevin-cannon-mario.mp4'
import PhotoGalleryVideo from './assets/student-kevin-cannon-photo-gallery.mp4'
import PhotoGalleryPoster from './assets/student-kevin-cannon-photo-gallery.mp4.jpg'
import ObjectDetectionVideo from './assets/student-lichin-object-detection.mp4'
import ObjectDetectionPoster from './assets/student-lichin-object-detection.mp4.jpg'
import LoyalCardVideo from './assets/student-max-loyal-card.mp4'
import LoyalCardPoster from './assets/student-max-loyal-card.mp4.jpg'
import FoodCardsVideo from './assets/student-lichin-food-cards.mp4'
import FoodCardsPoster from './assets/student-lichin-food-cards.mp4.jpg'
import ImageSplitterVideo from './assets/student-nicholas-image-splitter.mp4'
import ImageSplitterPoster from './assets/student-nicholas-image-splitter.mp4.jpg'
import MyTripsVideo from './assets/student-sofiya-my-trips.mp4'
import MyTripsPoster from './assets/student-sofiya-my-trips.mp4.jpg'

import BehancePoster from './assets/student-bigwhitebird-behance.mp4.jpg'
import BehanceVideo from './assets/student-bigwhitebird-behance.mp4'
import WeatherPoster from './assets/student-edo-wheather.mp4.jpg'
import WeatherVideo from './assets/student-edo-wheather.mp4'
import TripsPoster from './assets/student-gene-trips.mp4.jpg'
import TripsVideo from './assets/student-gene-trips.mp4'

const works = [
  {
    title: 'Trips',
    poster: TripsPoster,
    video: TripsVideo,
    author: 'Gene Guy',
    authorLink: 'https://twitter.com/geneguy2',
    link: 'https://twitter.com/geneguy2/status/1180973958356754435',
    featured: true,
  },
  {
    title: 'Weather',
    poster: WeatherPoster,
    video: WeatherVideo,
    author: 'Edoardo Fusaro',
    authorLink: 'https://twitter.com/edoeffe',
    link: 'https://twitter.com/edoeffe/status/1180905680808624128',
    featured: true,
  },
  {
    title: 'Behance',
    poster: BehancePoster,
    video: BehanceVideo,
    author: '大白鸟',
    // authorLink: "https://twitter.com/lichinlin",
    link: 'https://twitter.com/lintonye/status/1181440183679344640',
    featured: true,
  },
  {
    title: 'Insta-Spotify',
    poster: SpotifyPoster,
    video: SpotifyVideo,
    author: 'Lichin Lin',
    authorLink: 'https://twitter.com/lichinlin',
    link: 'https://twitter.com/lichinlin/status/1140844818609819649',
    featured: true,
  },
  {
    title: 'iOS app bar',
    poster: AppBarPoster,
    video: AppBarVideo,
    author: 'fabrizioColasanto',
    authorLink: null,
    link: null,
    // featured: true
  },
  {
    title: 'Super mario parallax',
    poster: MarioPoster,
    video: MarioVideo,
    author: 'Kevin Cannon',
    authorLink: 'https://twitter.com/multikev',
    link: 'https://codesandbox.io/s/week2-parallax-l87to',
    featured: false,
  },
  {
    title: 'Photo gallery',
    poster: PhotoGalleryPoster,
    video: PhotoGalleryVideo,
    author: 'Kevin Cannon',
    authorLink: 'https://twitter.com/multikev',
    link: 'https://twitter.com/multikev/status/1147981802989948928',
    featured: true,
  },
  {
    title: 'Object detector',
    poster: ObjectDetectionPoster,
    video: ObjectDetectionVideo,
    author: 'Lichin Lin',
    authorLink: 'https://twitter.com/lichinlin',
    link: 'https://twitter.com/lichinlin/status/1146784049857351681',
    featured: false,
  },
  {
    title: 'Bevust (loyal cards)',
    poster: LoyalCardPoster,
    video: LoyalCardVideo,
    author: 'Maximilian Bredow',
    authorLink: 'https://twitter.com/maxbredow',
    link: 'https://twitter.com/maxbredow/status/1147955030173061120',
    featured: true,
  },
  {
    title: 'Dragon boat food',
    poster: FoodCardsPoster,
    video: FoodCardsVideo,
    author: 'Lichin Lin',
    authorLink: 'https://twitter.com/lichinlin',
    link: 'https://twitter.com/lichinlin/status/1137763477731201024',
    featured: false,
  },
  {
    title: 'Image splitter',
    poster: ImageSplitterPoster,
    video: ImageSplitterVideo,
    author: 'Nicholas Pereira',
    authorLink: 'https://twitter.com/bynichp',
    link: 'https://twitter.com/lintonye/status/1137068808865177600',
    // featured: true
  },
  {
    title: 'My trips',
    poster: MyTripsPoster,
    video: MyTripsVideo,
    author: 'Sofiya Urumova',
    authorLink: 'https://twitter.com/SophieGva',
    link: 'https://twitter.com/SophieGva/status/1147923591473901568',
    featured: true,
  },
]

function shuffle(array: any[]) {
  const shuffled: any[] = Array.from(array)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getFeaturedWorks(count: number) {
  return shuffle(works.filter((w) => w.featured)).slice(0, count)
}

export function getAllWorks() {
  return works
}
