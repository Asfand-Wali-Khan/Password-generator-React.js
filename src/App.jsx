import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
function Password_generator() {
  let [length, setLength] = useState(22);
  let [numberAllowed, setNum_Allowed] = useState(false);
  let [charAllowed, setcharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  let passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";

    if (charAllowed) str += "!@#$%^&*()_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="input1"
            ref={passwordRef}
          />
          <button className=".button" onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <p id="range_length">Length : {length}</p>
        </div>
        <div className="Checkboxs">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <p id="CharacterInput">Character-Input</p>
        </div>
        <div className="CheckBox2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNum_Allowed((prev) => !prev);
            }}
          />
          <p id="NumberInput">Number-Input</p>
        </div>
      </div>
    </>
  );
}
export default Password_generator;
