import { useState, useCallback, useEffect, useRef } from 'react'
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(symbolAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, symbolAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select()
    document.execCommand("copy")
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, symbolAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-700 border border-gray-600">
          <input 
          type="text" 
          value={password}
          ref={passwordRef}
          className="outline-none w-full py-1 px-3 bg-white text-gray-800"
          placeholder="Your Password"
          readOnly
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 mb-4">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            ></input>
            <label >Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
            ></input>
            <label >Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            checked={symbolAllowed}
            onChange={(e) => setSymbolAllowed(e.target.checked)}
            ></input>
            <label >Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
