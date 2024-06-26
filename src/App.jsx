import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(""); 



  // useRef hook
  const passwordRef = useRef(null)  //---------------------------- useRef Defining



// ---------------------------------------------------------------useCallback hook
  const paswordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstwxyz"



if (numberAllowed){
  str+= "0123456789";
}

if(charAllowed) str+= "!@#$&*"



for (let i = 1; i <=length; i++) {
  let char = Math.floor(Math.random()*str.length +1)

  pass += str.charAt(char)
  
}


setPassword(pass); 

}, [length, numberAllowed, charAllowed, setPassword])



// ---------------------------------------------------------------use callback()

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select(); //---------------- from here you can show what have slected -----------------useRef
  passwordRef.current?.setSelectionRange(0,99); //----------- From here you can select the renge of selection -----------------useRef
  window.navigator.clipboard.writeText(password)
  // here you can use window bcoz of core react But in NEXT.js you cant use window due to server side rendering

},[password])



// -------------------------------------------------------------------useEffect()

useEffect(()=> {

  paswordGenerator()
}, [ length, numberAllowed, charAllowed, setPassword])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-500'> Password Generator
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className='ountline-none w-full py-1 px-2 placeholder-sky-300'
      placeholder='Password'
      readOnly
      ref={passwordRef} //------------------------------------------------------Use of useReff 
       />

       <button 
       onClick={copyPasswordToClipboard} //-------------------------invoking method(function) use of  useCallback
       className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
       >Copy</button>
        </div>
        
  <div className='flex text-sm gapx-2 filter '>
        <div className='flex item-center gap-x-1 filter'>

        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=> {setLength(e.target.value)}} />
        <label> Length: {length} </label>
        </div>

        <div> 
        <input type="checkbox" 
         defaultChecked= {numberAllowed} 
         id='numberInput'
         onChange={ ()=> {setNumberAllowed ( (prev) => !prev); }}/>
        <label htmlFor="numberFor"> Numbers{numberAllowed} </label>
        </div>
        
        <div>
          
        <input type="checkbox"
        defaultChecked={charAllowed}
        id='characterInput'
        onChange={ ()=> {setCharAllowed ( (prev) => !prev); }} />
        <label htmlFor="characterFor"> Character{charAllowed} </label>
        </div> 
        


        
       </div>
    </div>
    </>
  )
}

export default App
