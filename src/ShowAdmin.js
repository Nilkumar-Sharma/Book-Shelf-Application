import React, { useEffect,useState } from "react";
import { useBooks } from "./BookContext";
import { redirect } from "react-router-dom";
import {Link} from 'react-router-dom'
import { Modal, Button } from "react-bootstrap";
export default()=>{
    const {books,deleteBook,updateBook}=useBooks();
    const [deletedBookName, setDeletedBookName] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const handleRemove = (book) => {
        const confirmation = window.confirm(`Are you sure you want to remove ${book.name}?`);
        if (confirmation) {
            deleteBook(book);

            setDeletedBookName(book.name);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

        }
        console.log(`Removing book with ID: ${book.name}`);
    };
    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = books.filter(
            book =>
                book.name.toLowerCase().includes(query) || book.isbn.toLowerCase().includes(query)
        );
        setFilteredBooks(filtered);
    };

    const handleSaveChanges = () => {
        if (selectedBook) {
            updateBook(selectedBook);
            setShowModal(false);
            setSelectedBook(null);
        }
    };
    const handleClose = () => {
        setShowModal(false);
        setSelectedBook(null);
    };


    const renderBooks=(booksToRender)=>{
        if (booksToRender.length === 0) {
            return (
                <div className="alert alert-warning" role="alert">
                    No matching books found
                </div>
            );
        }
        return booksToRender.map(book=>   <div key={book.isbn} className="card mb-3 d-flex justify-content-center">
        <div className="card-body ">
            <h5 className="card-title">{book.name}</h5>
            <p className="card-text">ISBN: {book.isbn}</p>
            <p className="card-text">Category: {book.category}</p>
            <p className="card-text">Row No: {book.row}</p>
            <p className="card-text">Book Count: {book.count}</p>
            <p className="card-text">Cost: {book.cost}</p>
            <p className="card-text">Availability: {book.availability}</p>
            <div className="btn-group d-flex justify-content-spaces-around" role="group">
                <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(book)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-danger "
                    onClick={() => handleRemove(book)}
                >
                    Remove
                </button>

                <Link to={`/ShowBook/${book.isbn}`} className="">
                            <button className="btn btn-info">
                                Go To
                            </button>
                        </Link>
            </div>
        </div>
    </div>
            )
    }
    
    return(
        <div className="container ">

<div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by ISBN or name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        <div className="input-group mb-3">
        </div>
        
        <div class=" ">{renderBooks(searchQuery ? filteredBooks : books)}</div>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedBook && (
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">ISBN</label>
                            <input disabled
                                type="text"
                                className="form-control"
                                id="name"
                                value={selectedBook.isbn}
                                onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value }) }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={selectedBook.name}
                                onChange={(e) => setSelectedBook({ ...selectedBook, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={selectedBook.category}
                                onChange={(e) => setSelectedBook({ ...selectedBook, category: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Row</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={selectedBook.row}
                                onChange={(e) => setSelectedBook({ ...selectedBook, row: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Count</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={selectedBook.count}
                                onChange={(e) => setSelectedBook({ ...selectedBook, count: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Cost</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={selectedBook.cost}
                                onChange={(e) => setSelectedBook({ ...selectedBook, cost: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Availability</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={selectedBook.availability}
                                onChange={(e) => setSelectedBook({ ...selectedBook, availability: e.target.value })}
                            />
                        </div>

                     
                    </form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Alert for successful deletion */}
        {showAlert && (
            <div className="alert alert-success" role="alert">
                {deletedBookName} deleted
            </div>
        )}
    </div>
    )
}