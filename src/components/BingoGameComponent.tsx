import { useEffect, useState } from "react"
import { BingoInputForm } from "./BingoInputForm"
import BingoList from "./BingoListComponent"
import {v4 as uuid} from 'uuid';

export default function BingoGame(){
    const [test,setTest]= useState(false)
    
   

    //GameStates
    const enum States{
        SelectGameMode,
        InputElements,
        GameInProgress,
    }

    const enum GameModes{
        None,
        Bingo,
        MiniBingo,
        TicTacBongo,
    }

    const [gameState,setGameState] = useState(States.SelectGameMode)

    //GameVariables
    const [selectGameMode,setSelectedGameMode] = useState(GameModes.None)
    
    const [readyToPlay,setReadyToPlay] = useState(false)

    const handleChangeGameMode = (e) =>{
        setSelectedGameMode(e);
        setGameState(States.InputElements)
    }

    const handleClick = () => {
        setTest(true);
    }

    const [todos,setTodos] = useState([])

    const addTodo = (thing) =>{
        if(todos.includes(thing))return
        setTodos(t => [...t,thing])
        console.log(todos)
    }

    function onReaderLoad(event){
        setTodos([]);
        console.log(event.target.result);
        try{
            var obj = JSON.parse(event.target.result);
        } catch(e){
            console.log(e)
        }
            if(obj.Bingos !== null){
            setTodos(obj.Bingos)
        }
    }

    useEffect(() => {
        switch(selectGameMode){
            case GameModes.Bingo:
                if(todos.length == 25) setReadyToPlay(true)
                else setReadyToPlay(false)
            break;
            case GameModes.MiniBingo:
                if(todos.length == 16) setReadyToPlay(true)
                else setReadyToPlay(false)
            break;
            case GameModes.TicTacBongo:
                if(todos.length == 9) setReadyToPlay(true)
                else setReadyToPlay(false)
            break;
        }
    },[todos])

    useEffect(()=>{
        if (readyToPlay) alert("GOTOWE");
    },[readyToPlay])


    const removeBingoElement = (e) => {
        console.log(e)
        setTodos(todos.filter(t => t !== e.b));
        const inputFile = document.getElementById("inputFile") as HTMLInputElement;
    if (inputFile) {
        inputFile.value = '';
    }
    }

    function shuffleArray(array) {
        console.log("shufel")
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }



    const handleFileInput = (e) =>{
    
        let reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.target.files[0])
    }

    const [zaznaczone,setZaznaczone] = useState([])

    const changeZaznaczone = (e) =>{
        
        if(!zaznaczone.includes(e.t)) setZaznaczone(z => [...z,e.t])
        else setZaznaczone(zaznaczone.filter(t => t !== e.t));
        console.log(zaznaczone)
    }
    
    const handleDownload = (filename,text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    const handleCreateFile = () =>{
        return `{"Bingos":${JSON.stringify(todos)}}`
    }
    switch(gameState){
        case States.SelectGameMode:
            return(
                <>
                    <button onClick = { () => handleChangeGameMode(GameModes.Bingo)}>Bingo</button>
                    <button onClick={() => handleChangeGameMode(GameModes.MiniBingo)}>Mini Bingo</button>
                    <button onClick={() => handleChangeGameMode(GameModes.TicTacBongo)}>TicTacBongo</button>
                </>
            )
            break;
        case States.InputElements:
            return(
                <>
                    <h1>Wprowadź {selectGameMode === GameModes.Bingo ? "25" : selectGameMode === GameModes.MiniBingo ? "16" : "9"} elementów</h1>
                    <h2>lub załaduj z pliku </h2>
                    <input disabled={readyToPlay} onChange={ (e) => handleFileInput(e)} type="file" id="inputFile"/>
                    {!readyToPlay ? <BingoInputForm addTodo={addTodo}/> : null}
                    <BingoList bingos={todos}  removeElement={ (e) => removeBingoElement(e)} /> 
                    {
                        readyToPlay ? <button onClick={()=> {setGameState(States.GameInProgress);shuffleArray(todos)}}>Graj</button> : null
                    }
                </>
            );
            break;
        case States.GameInProgress:

            
  
            

            switch(selectGameMode){
                case GameModes.Bingo:
                    return(
                        <>
                            <div style={{display:"grid",width:"90vw",height:"90vh", gridTemplateColumns:"repeat(5, 1fr)", gridTemplateRows:"repeat(5, 1fr)", gridGap:"5px"}}>
                            {
                                todos.map( t => zaznaczone.includes(t) ? <div onClick={()=>changeZaznaczone({t})} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",backgroundColor:"red"}} key={t}>{t}</div> : <div onClick={()=>changeZaznaczone({t})} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",}} key={t}>{t}</div>)
                            }
                            </div>
                            
                            <button onClick={()=>handleDownload(`Bingo-game.json`,handleCreateFile())}>Pobierz JSON</button>
                            
                        </>

                    )  
                case GameModes.MiniBingo:
                    return(
                        <>
                            <div style={{display:"grid",width:"90vw",height:"90vh", gridTemplateColumns:"repeat(4, 1fr)", gridTemplateRows:"repeat(4, 1fr)", gridGap:"5px"}}>
                            {
                                todos.map( t => zaznaczone.includes(t) ? <div onClick={()=>changeZaznaczone({t})} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",backgroundColor:"red"}} key={t}>{t}</div> : <div onClick={()=>changeZaznaczone({t})} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",}} key={t}>{t}</div>)
                            }
                            </div>
                            
                            <button onClick={()=>handleDownload(`MiniBingo-game.json`,handleCreateFile())}>Pobierz JSON</button>
                            
                        </>

                    )    
                break;
                case GameModes.TicTacBongo:
                    return(
                        <>
                            <div style={{display:"grid",width:"90vw",height:"90vh", gridTemplateColumns:"repeat(3, 1fr)", gridTemplateRows:"repeat(3, 1fr)", gridGap:"5px"}}>
                            {
                                todos.map( t => zaznaczone.includes(t) ? <div onClick={()=>changeZaznaczone({t})} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",backgroundColor:"red"}} key={t}>{t}</div> : <div onClick={()=>changeZaznaczone({t})} style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}} key={t}>{t}</div>)
                            }
                            </div>
                            
                            <button onClick={()=>handleDownload(`TicTacBong-game.json`,handleCreateFile())}>Pobierz JSON</button>
                            
                        </>

                    )
                    break;
            }
            break;
    }
}


