import React, { useRef, useState } from "react";

export const BingoInputForm = ({addTodo}) => {
    const [value,setValue] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if(value==="") return
        addTodo(value)
        setValue("")
    }
  

    return(
        
        <form className="bingoInputForm" onSubmit={handleSubmit}>
            <input  type="text" value={value} onChange={(e) => setValue(e.target.value)}  className="bingoInput" placeholder="Co się wydarzy?"></input>
            <button type="submit" className="bingoInputBtn">Dodaj!</button>
        </form>
    )
}