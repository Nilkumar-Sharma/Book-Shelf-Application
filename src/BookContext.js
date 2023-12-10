import React,{createContext,useState,useContext} from "react";

const BookContext=createContext();

const BookProvider=({children})=>{
    const [books,setBooks]=useState([]);
    

    const addBook=(book)=>{
        setBooks([...books,book])
    }
    const deleteBook=(deletBook)=>{
        const deleteBook=books.filter(book=>book.isbn!=deletBook.isbn)
        setBooks(deleteBook)
    }
    const  updateBook=(item)=>{
    const updatedBooks = books.map((book) =>
      book.isbn === item.isbn ? item : book
    );
    setBooks(updatedBooks);

    }

    return (
        <BookContext.Provider
          value={{ books, addBook, deleteBook, updateBook }}
        >
          {children}
        </BookContext.Provider>
      );

}



const useBooks = () => {
    return useContext(BookContext);
  };
  
  export { BookProvider, useBooks };