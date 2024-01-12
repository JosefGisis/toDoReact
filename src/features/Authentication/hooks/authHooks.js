import { useCallback, useState } from "react";

export function useLogin(){
    const meta  = useState({isLoading:false, errors:null})
    
    const login = useCallback(()=>{
        // Do your login stuff hjere
    },[])

    return [login, meta]

}