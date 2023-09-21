function findAccountById(accounts, id) {
  const result = accounts.find((user)=>{
    return user.id === id
  })
  return result
}

function sortAccountsByLastName(accounts) {
   accounts.sort((elA, elB)=> {
    return elA.name.last < elB.name.last ? -1 : 1
  })
  return accounts
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  const result = books.reduce((acc, book) => {
    if (book.borrows.some(borrow => borrow.id === account.id)) {
      acc++
    }
    return acc
  }, 0)
  return result
}

// function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
//   //returning a arr
//   //arr includes book obj with author obj psuhed on
//   //arr represents the books inputted user has checked out currently


//   let result = []
//   const usersBook = books.forEach(bookObj => {
//     const {borrows} = bookObj
//     if(id === account.id && returned === false) {
//       const bookAuthor = authors.find(authorObj => {
//         return bookObj.authorId === authorObj.id
//       })
//       result +=
//     }
//   })
// }

// function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
//   let result = [];

//   books.forEach((bookObj) => {
//     const { borrows } = bookObj;
//     const checkedOutByUser = borrows.some(borrow => {
//       borrow.id === account.id && !borrow.returned
//   });

//     if (checkedOutByUser) {
//       const author = authors.find(authorObj => {
//         authorObj.id === bookObj.authorId
//       });
//       const bookWithAuthor = {
//         ...bookObj,
//         author,
//       };

//       result.push(bookWithAuthor);
//     }
//   });

//   return result;
// }

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  return books.filter((book) =>
      book.borrows
      .some((borrow) => borrow.id === account.id && !borrow.returned
      )
    )
    .map((book) => ({
      ...book,
      author: authors.find((author) => author.id === book.authorId),
    }));
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
