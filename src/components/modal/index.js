import React from "react";
import "./index.css";

export default function Modal({ isShow, data, onCancel }) {
    const imageUrl = data?.i?.imageUrl || "defaultImagePath.png";

    return (
        <div className={!isShow ? "hidden" : "modal-bg"} data-cy="modal-delete">
            <div className="modal">
                <button className="close-button" onClick={onCancel}>&times;</button>
                {data ? (
                    <>
                        <img src={imageUrl} alt="Detail" />
                        <h3>{data.l}</h3>
                        <p>Tahun Rilis: {data.y || "TBD"}</p>
                        <p>Pemeran: {data.s || "Tidak tersedia"}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
