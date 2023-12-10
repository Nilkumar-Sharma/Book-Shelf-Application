import React, { useState,useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useBooks } from "./BookContext";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import {toPng} from "html-to-image";
import {useNavigate } from 'react-router-dom'

export default () => {
    const { isbn } = useParams();
    const { books } = useBooks();
    const navigate = useNavigate ();

    const qrCodeRef = useRef(null);
    // toPng()

    const selectedBook = books.find((book) => book.isbn === isbn);
    if(selectedBook==null){
        setTimeout(()=>navigate('/',5000));
        // navigate('/')
    }
    
    const downloadQRCode = () => {
        const svg = qrCodeRef.current.innerHTML;

        toPng(qrCodeRef.current)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${isbn}_qr.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error converting QR code to PNG:", error);
            });
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            {selectedBook ? (
                <div className="card center">
                    <div className="card-body ">
                        <h5 className="card-title">{selectedBook.name}</h5>
                        <p className="card-text">ISBN: {selectedBook.isbn}</p>
                        <p className="card-text">Category: {selectedBook.category}</p>
                        <p className="card-text">Row: {selectedBook.row}</p>
                        <p className="card-text">Count: {selectedBook.count}</p>
                        <p className="card-text">Cost: {selectedBook.cost}</p>
                        <p className="card-text">Availability: {selectedBook.availability}</p>

                        <label>Qr Code</label>
                        <div ref={qrCodeRef}>
                                <QRCode id="qrcode-canvas" value={`localhost:3000/ShowBook/${isbn}`} />
                            </div>

                            {/* Download QR Code button */}
                            <button className="btn btn-primary mt-3" onClick={downloadQRCode}>
                                Download QR Code
                            </button>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Book not found
                 
                </div>
            )}
        </div>
    );
};
