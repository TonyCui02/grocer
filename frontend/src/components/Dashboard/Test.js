import React, { useState, useEffect, useContext } from "react";


export default function Test() {
    const [test, setTest] = useState('')
    
    function handleChange(e) {
        setTest(e.target.value);
        console.log(test)
    }

    return (
        <div>
            <input value={test} onChange={handleChange}/>
            <h1>{test}</h1>
        </div>

    )
}