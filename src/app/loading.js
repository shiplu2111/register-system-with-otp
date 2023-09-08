import React from 'react';
import Link from "next/link";

const Loading = () => {
    return (
        <div className="container">
            <div className="row d-flex vh-100 align-content-center justify-content-center">
                <div className="col-6 text-center">
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;