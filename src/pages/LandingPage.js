import React, { useState, useEffect } from "react";
import axios from "axios";
// Components
import Card from "../components/card";
import Modal from "../components/modal";

export default function LandingPage() {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("One Piece");
    // Modal
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    "https://imdb8.p.rapidapi.com/auto-complete", {
                        params: { q: query },
                        headers: {
                            "x-rapidapi-host": "imdb8.p.rapidapi.com",
                            "x-rapidapi-key": "3fed93c7dfmsha73a94336e20140p1ca530jsn002087118f30",
                        },
                    }
                );
                console.log(response.data); // Memeriksa data dari API
                if (response.status === 200) {
                    setData(response.data);
                    setIsLoaded(true);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!isLoaded) {
            fetchData();
        }
    }, [isLoaded, query]);

    const onSearch = (e) => {
        if (e.key === "Enter") {
            setIsLoaded(false);
            setQuery(e.target.value);
        }
    };

    const handleClick = (item) => {
        setModalShow(!modalShow);
        setModalItem(item);
    };

    return (
        <main>
            <input
                type="text"
                placeholder="Search film by name"
                onKeyDown={(e) => onSearch(e)}
            />
            <h3 className="title">Search : {query}</h3>
            {!data || isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="card-container">
                    {data.d.map((item, index) => {
                        const imageUrl = item?.i?.imageUrl || "defaultImagePath.png"; // Ganti dengan path gambar default jika tidak ada
                        return (
                            <Card 
                                data={item} 
                                key={index} 
                                onClick={() => handleClick(item)} 
                                imageUrl={imageUrl} // Mengirimkan imageUrl ke Card
                            />
                        );
                    })}
                </div>
            )}
            <Modal
                data={modalItem}
                isShow={modalShow}
                onCancel={() => setModalShow(false)}
            />
        </main>
    );
}
