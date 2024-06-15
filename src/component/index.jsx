import React, {useState, useEffect} from "react";

export default function ScrollBar({url}){

    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [scrollPercent, setScrollPercent] = useState(0);

    async function fetchData(getUrl){
        try{
            setLoading(true);
            const responce = await fetch(getUrl);
            const data = await responce.json();

            if(data && data.products && data.products.length > 0){
                setData(data.products);
                setLoading(false);
            };
        }
        catch(error){
            console.log(error);
            setErrorMessage(error.message);
        }
    };

    useEffect(()=>{
        fetchData(url);
    },[url]);

    console.log(data, loading);

    return (
        <div className="scroll-bar">
            <h1>Scroll Bar!</h1>
            <div className="data-container">
                {
                    data && data.length > 0
                    ? data.map((dataItem)=> <p>{dataItem.title}</p>)
                    : null
                }
            </div>
        </div>
    );
};
//2.33