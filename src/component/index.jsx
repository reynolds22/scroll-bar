import React, {useState, useEffect} from "react";
import "./scroll.css";

export default function ScrollBar({url}){

    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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

    function handleScrollPercentage(){
        const amountScrolled = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollTop - document.documentElement.clientHeight;

        setScrollPercent((amountScrolled / height) * 100);
    };

    useEffect(()=>{
        window.addEventListener("scroll", handleScrollPercentage)
        return ()=> {
            window.removeEventListener("scroll", () => {})
};
    },[]);

    if(errorMessage){
        return <div>Error ! {errorMessage}</div>
    };

    if(loading){
        return <div>Loading data !</div>
    };

    return (
        <div>
            <div className="top-container">
                <h1>Scroll Bar!</h1>
                <div className="tracking-container">
                    <div 
                        className="current-progress" 
                        style={{width : `${scrollPercent}%`}}
                    ></div>
                </div>
            </div>
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