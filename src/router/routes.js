import CatImages from '@/components/CatImages';
import FibonacciSequence from '@/components/FibonacciSequence';
import CatsList from '@/components/CatsList';

const routes = [
  {
    path: '/',
    component: CatImages,
  },
  {
    path: '/fibonacciSequence',
    component: FibonacciSequence,
  },
  {
    path: '/catsList',
    component: CatsList,
  }
]
export default routes
