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