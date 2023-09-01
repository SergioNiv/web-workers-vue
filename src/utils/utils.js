export const fibonacci = (count) => {
  if (count <= 1) {
    return Math.max(0, count)
  }

  return fibonacci(count - 1) + fibonacci(count - 2)
}

export const fetchKitten = (isList) => {
  return new Promise((resolve, reject) => {

    setTimeout(async () => {
      let url = 'https://api.thecatapi.com/v1/images/search'
      isList && (url += '?api_key=live_UTtPr1qzG86sFSOiUKQSX7VTZRlicSkLsTRYfrQPhq2As7lA0Q0VbcbDsLQE41ke&limit=100')
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isList) {
          resolve(data);
        } else {
          const catImage = data[0].url;
          resolve(catImage);
        }
        console.log('Data was successfully!');
      } catch (error) {
        console.error('Error fetching kitten:', error);
        reject(error);
      }
    }, 5000);
  });
}