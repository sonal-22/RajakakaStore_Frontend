import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/add-stock">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/AllList">All List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/TransferList">Transfer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/DisplayList">Display</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/OrderList">Order</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/daily-summery">Daily Summary</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/DamagedProductList">Damaged Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/forgot-password">Forgot Password</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
