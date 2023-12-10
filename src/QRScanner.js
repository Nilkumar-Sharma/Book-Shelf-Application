import React, { useState } from "react";
import {QrReader} from "react-qr-reader";
import {Navigate, useNavigate } from 'react-router-dom'
const QRScanner = () => {
    const navigate = useNavigate ();
    const [scanResult, setScanResult] = useState(null);

    const handleScan = (data) => {
        if (data) {
            setScanResult(data);
            // Rediret to the book page using the scanned ISBN or QR code data
            navigate(`/ShowBook/${data}`);
        }
    };

    const handleError = (error) => {
        console.error("QR Scanner error:", error);
    };

    return (
        <div className="container">
            <h2>QR Code Scanner</h2>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
            />
            {scanResult && <p>Scanned Result: {scanResult}</p>}
        </div>
    );
};

export default QRScanner;
