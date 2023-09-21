function findAuthorById(authors=[], id=0) {
  const result = authors.find((authroObj)=>{
    return authroObj.id === id
  })
  return result
}

function findBookById(books=[], id="") {
  const result = books.find(bookObj => {
    return bookObj.id === id
  })
  return result
}

function partitionBooksByBorrowedStatus(books=[]) {
  const checkedOut = []
  const returned = []
  books.forEach(bookObj => {
    const {borrows} = bookObj
    const isNotreturned = borrows.some((element) => {
      return element.returned === false
    })
    if (isNotreturned === true) {
      checkedOut.push(bookObj)
    }else{
      returned.push(bookObj)
    }
  })
  return [checkedOut, returned]
}

// function getBorrowersForBook(book={}, accounts=[]) {
//   const result = accounts.filter(userObj => {
//     const {id} = userObj 
//     return 
//   })
// }

// function getBorrowersForBook(book={}, accounts=[]) {
//   const borrowers = book.borrows.map(borrow => {
//     const account = accounts.find(account => account.id === borrow.id)
//     return { ...account, returned: borrow.returned }
//   })
//   return borrowers.slice(0,10)
// }

function getBorrowersForBook(book={}, accounts=[]) {
  const result = []
  const {borrows} = book
  borrows.forEach(borrowObj => {
    const {id, returned} = borrowObj
    const foundUser = accounts.find(userObj => {
      return userObj.id === id
    })
    foundUser.returned = returned
    result.push(foundUser)
  })
  return result.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
