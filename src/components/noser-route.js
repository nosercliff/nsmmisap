import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import NoserAuthenticate from './noser-auth'
export const ProtectedRoute =({component:Component, ...rest})=>{
    return (
        <Route {...rest} render ={
            (props) =>{
                
                if(NoserAuthenticate.IsAuthenticated())
                {
                    return <Component {...props} />
                }
                else
                {
                    return <Redirect to={{
                        pathname:"/",
                        state:{
                            from:props.location
                        }
                    }}/>
                }
            }} /> 
    )
}
