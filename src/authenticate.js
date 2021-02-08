import React from 'react'
import { parseJSON } from 'date-fns';

class NoserAuthenticate{
    constructor(){
        
    }
    
    IsAuthenticated(){
        if(sessionStorage.getItem("userData"))
            return true;
        else
            return false;
    }
}

export default new NoserAuthenticate()