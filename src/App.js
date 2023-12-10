import React from "react";
import { Link } from "react-router-dom";
import { BookProvider } from "./BookContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowAdmin from "./ShowAdmin";
import ShowBook from "./ShowBook";
import QRScanner from "./QRScanner";
import AddBook from "./AddBook";

export default () => {
    return (
        <div>
            <BookProvider>
                <BrowserRouter>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <Link to="/Admin" className="navbar-brand">
                                BookShelf Application
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/Admin" className="nav-link">
                                            Add Book
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/ShowAdmin" className="nav-link">
                                            Books
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/QRScanner" className="nav-link">
                                            QR Scanner
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <Routes>
                        <Route path="/Admin" element={<AddBook />} />
                        <Route path="/ShowAdmin" element={<ShowAdmin />} />
                        <Route exact path="/ShowBook/:isbn" element={<ShowBook />} />
                        <Route exact path="/QRScanner" element={<QRScanner />} />
                    </Routes>
                </BrowserRouter>
            </BookProvider>
        </div>
    );
};
