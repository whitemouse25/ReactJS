import { useCallback, useState } from "react";

export default function App() {
  const [length, setLength] = useState(8);

  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let chars = "!@#$%^&*()~";

    if (numAllowed) {
      str += num;
    }
    if (charAllowed) {
      str += chars;
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 w-96 p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-2 text-gray-600"
              placeholder="Password"
              value={password}
              readOnly
            ></input>
            <button
              className="rounded-sm bg-blue-500 m-2 ml-4 text-white p-3"
              onClick={passwordGenerator}
            >
              Generate
            </button>
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={6}
              max={60}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-sm ml-2 text-red-400">
              Length: {length}
            </label>
          </div>
          <div className="mt-4 gap-4">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="mt-4 gap-4">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}
