import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  let [length, setLength] = useState(8) ;
  const [allowNumber, setAllowNumber] = useState(true) ;
  const [allowChar, setAllowChar] = useState(true) ;
  const [password, setPassword] = useState("") ;
  const [displayConfirmation, setDisplayConfirmation] = useState(false) ;
   let currentPass = useRef(null) ;

  const generatePassword = useCallback(() => {
    let passwordStr = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(allowNumber) passwordStr += "1234567890" ;
    if(allowChar) passwordStr += "!@#$%^&*()_+-=?<>;:"
    let pass = ""

    for (let i = 1; i <= length; i++) {
       pass += passwordStr.charAt(Math.floor(Math.random() * passwordStr.length + 1));
    }

      checkMyPassWord(pass) === true  ? setPassword(pass) :  generatePassword() ; 

  } , [length, allowNumber , allowChar  , setPassword, checkMyPassWord])

function checkMyPassWord(pass){
  let numberPresent = false;
  let charPresent = false ;

    for (let i = 0; i <pass.length; i++) {
      const charAscii = pass.charCodeAt(i) ;
      if(charAscii >= 48 && charAscii <= 57) { numberPresent = true} 
      if((charAscii >= 33 && charAscii <= 47) || charAscii >= 58 && charAscii <= 64) { charPresent = true}  
  } 
      // console.log(numberPresent + " " + charPresent+ " " + allowNumber + " " +  allowChar) ;
return ((numberPresent === allowNumber) && (charPresent === allowChar))
}

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password) ;
    setDisplayConfirmation(true) ;
    setTimeout(() => {setDisplayConfirmation(false)}, 2000) ;
    currentPass.current.select()
  }

  useEffect(() => {generatePassword()} , [length , allowNumber, allowChar , setPassword])
  return (
    <>
         <h1>Password Generator</h1>
    <div className="container">
      {!displayConfirmation  && <p style={{fontSize: "12px"}}>Random, Strong, Secure: Your Digital Shield. 😇</p>}
      {displayConfirmation  && <p style={{fontSize: "12px" , color : "lightgreen"}}>Password copied to your clipboard...! 👍</p>}
        <div className="password-display">
            <input type="text" id="passwordOutput" readOnly value={password} ref={currentPass}/>
            <button id="copyButton" onClick={() => {copyPasswordToClipBoard()}}>copy</button>
        </div>
        <div className="controls">
            <div className="length-control">
                <input type="range" id="lengthSlider" defaultValue={length} min="6" max="20" onChange={(e) => {setLength(e.target.value)}} />
                <label htmlFor="lengthSlider">Length (<span id="lengthValue">{length}</span>)</label>
            </div>
            <div className="checkbox-group">
                <input type="checkbox" id="numbersCheckbox" defaultChecked={allowNumber} onChange={() => {setAllowNumber(!allowNumber)}}  /> 
                <label htmlFor="numbersCheckbox">Numbers</label>
            </div>
            <div className="checkbox-group">
                <input type="checkbox" id="charactersCheckbox" defaultChecked={allowChar} onChange={() => {setAllowChar(!allowChar)}} />
                <label htmlFor="charactersCheckbox">Characters</label>
            </div>
        </div>
    </div>        
    </>
  )
}

export default App
