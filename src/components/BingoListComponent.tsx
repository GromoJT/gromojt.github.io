

export default function BingoList({bingos,removeElement}){
    
    //console.log(bingos);


    return(
    <div>
        <ul>
            {
                bingos.map((b)=>
                    <li key={b}> {b} <button onClick={()=>removeElement({b})}>Usuń</button></li>
                )
            }
        </ul>
    </div>
    )
}