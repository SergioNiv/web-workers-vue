import CatImages from '@/components/CatImages';
import FibonacciSequence from '@/components/FibonacciSequence';
import CatsList from '@/components/CatsList';
import ItemsList from '@/components/ItemsList';

const routes = [
  {
    path: '/',
    component:ItemsList,
  },
  {
    path: '/fibonacciSequence',
    component: FibonacciSequence,
  },
  {
    path: '/catsList',
    component: CatsList,
  },
  {
    path: '/cats',
    component: CatImages,
  }
]
export default routes
