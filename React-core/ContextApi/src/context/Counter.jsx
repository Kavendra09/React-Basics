import { useState } from "react";
import { useContext } from "react";

export const CounterContext = useContext(null)

export const CounterProvider = ({children}) => {
    const [counter,setCounter] = useState(0)
    return (
        <CounterContext.Provider value={{counter}} >
            {children}
        </CounterContext.Provider>
    )
}