import { useEffect } from "react";
import { useState } from "react";

/**
 * 
 * @param {*} key 
 * @param {*} defaultValue 
 * @returns 
 * 
 * The useLocalStorage function takes two parameters: key (the key to store the value in localStorage) and defaultValue (the initial value if no value is found in localStorage).
Inside the function, the useState hook is used to create a state variable value and a corresponding setter function setValue. The initial value is set using a function passed to useState. This function checks if there is a value stored in localStorage with the given key. If found, it parses the JSON value and returns it. Otherwise, it checks if defaultValue is a function and calls it to get the initial value, or simply returns defaultValue.
The useEffect hook is used to save the value to localStorage whenever it changes. It listens for changes in both the key and value dependencies. Whenever either of them changes, the effect function is called, and it updates the value in localStorage by stringifying the value and using localStorage.setItem.
Finally, the useLocalStorage hook returns an array [value, setValue], allowing the component using this hook to access the current value and update it.
By using this custom hook, you can easily manage state that persists in localStorage across multiple renders of your component.
 */


export default function useLocalStorage(key,defaultValue){

    //initialize value either (value from localStorage) or (returned value from a function) or (default value)
    const [value,setValue] = useState( () => {

        const jsonValue = localStorage.getItem(key)
        
        if (jsonValue) return JSON.parse(jsonValue)


        if (typeof defaultValue === "function") {
            return defaultValue()
        }else{
            return defaultValue
        }
        
    })

    
    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value])


    return [value,setValue]
}