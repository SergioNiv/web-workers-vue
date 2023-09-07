import { fibonacci } from '@/utils/utils'
import { fetchKitten } from '@/utils/utils'
import { ref, uploadBytes, deleteObject, listAll, getStorage } from "firebase/storage"
import { storage } from '../firebase';

const storageFirebase = getStorage()

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
  return fetchKitten(isList).then(response => {
    return response
  })
}
export const wwUpload = async (file) => {
  const storageRef = ref(storage, `folder/${file?.name}`);
  return uploadBytes(storageRef, file).then(() => {
  }).catch((e) => {
    console.log(e);
  })
}
export const wwOnDelete = async (path) => {
  const desertRef = ref(storage, path)
  return deleteObject(desertRef).then(() => {
  }).catch((error) => {
    console.log(error)
  });
}
export const wwGetVideos = async () => {
  const listRef = ref(storageFirebase, 'folder/');
  return listAll(listRef)
    .then((res) => {
      return res
    }).catch((e) => {
      console.log(e, 'e')
    })
}
