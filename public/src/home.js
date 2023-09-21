function getTotalBooksCount(books=[]) {
  return books.length
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length
}

// function getBooksBorrowedCount(books=[]) {
//   let result = books.reduce((total, bookObj) => {
//     if(bookObj.borrows.returned === false) {
//       total++
//     }
//     return total
//   }, 0)
//   return result
// }

function getBooksBorrowedCount(books = []) {
  return books.reduce((total, bookObj) => {
    if (bookObj.borrows && bookObj.borrows.length > 0 && 
      !bookObj.borrows[0].returned) {
      total++;
    }
    return total;
  }, 0);
}



function getMostCommonGenres(books=[]) {
  let lookup = []
  books.forEach(bookObj => {
    const {genre} = bookObj
    if(!lookup[genre]) {
    lookup[genre] = 1
    }else {
      lookup[genre]++
    }
  })
  const result = []
  for(let key in lookup) {
    const obj = {name: key, count: lookup[key]}
    result.push(obj)
  }
  result.sort((elA, elB) => {
    return elB.count - elA.count 
  })
  return result.slice(0,5)
}

function getMostPopularBooks(books = []) {
 books.sort((elA, elB) => {
  return elB.borrows.length - elA.borrows.length
 })
 const result = books.slice(0,5).map(bookObj => {
  const {title, borrows} = bookObj
  return {name: title, count: borrows.length}
 })
 return result
}

function getMostPopularAuthors(books=[], authors=[]) {
  const topFive= books.sort((elA, elB) => {
    return elB.borrows.length - elA.borrows.length
   }).slice(0,5)
   const result = []
   topFive.forEach(bookObj => {
    const {authorId, borrows} = bookObj
    const author = authors.find(authorObj => {
      return authorId === authorObj.id
    })
    const obj = {name: joinName(author), count:borrows.length}
    result.push(obj)
   })
   return result
}

//helper function
function joinName(author) {
  return `${author.name.first} ${author.name.last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
