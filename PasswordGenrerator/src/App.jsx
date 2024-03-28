import { useState , useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numAllowed , setnumAllowed] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)
  const [password ,setpassword] = useState("")

  const passwordRef = useRef(null)
  // useref ap ko reference deta hai k koi bhi element hai kisi ka bhi refrence ly sakty ho or maniuplation kr sakty ho refrence ko pass krna prta hai

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()?><{}~`?/[]"

    for (let i = 1; i <= length; i++){
      let char =Math.floor( Math.random()* str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)
  }, [length,numAllowed, charAllowed, setpassword])

  const copyPasswordToClipboard = useCallback(() =>{ 
    // usecallback function ko memroize krta hai jita ho saky ho sakta hai parts or ho sakta hai pora hi kr ly
    // jb bhi hamara page load hota hai tou first time pr call hota hai or dependency array main sy kisy ko bhi change kiya tou ya dobara reload hota hai is ka ilawa next chapter main discuss h ga
    passwordRef.current?.select() 
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)},[password])

  useEffect(()=> {passwordGenerator()},[length, numAllowed,charAllowed,passwordGenerator])
  
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-20 bg-gray-700 text-orange-800'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" value={password} className="outline-none w-full py-1 px-3"placeholder="password" readOnly ref={passwordRef} />
      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900'>copy</button>
     </div>
     <div className='flex text-bold text-white gap-x-2'>
      <div className='flex items-center gap-x-1 '>
        <input type="range" min={6} max={100} value={length} className='cursor-pointer '
        onChange={(e) => {setlength(e.target.value)}} />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox"defaultChecked={numAllowed} id='nunmberinput'onChange={() => {setnumAllowed((prev) => !prev);}} />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <input type="checkbox"
      defaultChecked={charAllowed}
      id='characterInput'
      onClick={() =>{
        setcharAllowed((prev) => !prev );
      }} />
      <label htmlFor="characterInput">Characters</label>
     </div>
   

     </div>
     
    </>
  )
}

export default App
