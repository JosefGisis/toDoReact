import { useRef } from 'react'

function Form() {
    // can also use onChange with the input elements and a useState hook
    // can also react-hook-from library
    const nameRef = useRef(null)

    return (
        <>
            <form onSubmit={(event) => (
                event.preventDefault(),
                console.log(nameRef.current.value)
                )}>
                <label htmlFor="input-box">Hello</label>
                <input ref={nameRef} id="input-box" type="text" className=""></input>
                <button>submit</button>
            </form>
        </>
    )
}

export default Form