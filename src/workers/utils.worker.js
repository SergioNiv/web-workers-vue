import { fibonacci } from '@/utils/utils'
import { fetchKitten } from '@/utils/utils'

export const helloWorld = async () => {
  return 'Fibonacci number sequence'
}

export const wwFibonacci = async (count) => {
  console.log('worker', count);
  return fibonacci(count)
}

export const doHardWork = async (count) => {
  setInterval(()=> {
    console.log("performed hard work")
    count++
  } ,300)
  return count
}

export const wwFetchKitten = async (isList) => {
  console.log('Go with web worker');
  const result = await fetchKitten(isList)
  console.log('Resolved with web worker');
  return result
}