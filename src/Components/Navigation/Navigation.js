import React from 'react';
import "./Navigation.css";


const Navigation = (props)=>{

    if(props.isSignedIn){
        return (
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>props.onRouteChange("signout")} className='f3 link black mr2 pa3 pointer box b ph3 pv2 shadow-5 input-reset ba b--black bg-transparent grow pointer f6 dib'>Sign Out</p>
            </nav>
        );
    }
    else{
        return (
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>props.onRouteChange("signin")} className='f3 link black mr2 pa3 pointer box b ph3 pv2 shadow-5 input-reset ba b--black bg-transparent grow pointer f6 dib'>Sign In</p>
                <p onClick={()=>props.onRouteChange("register")} className='f3 link black mr2 pa3 pointer box b ph3 pv2 shadow-5 input-reset ba b--black bg-transparent grow pointer f6 dib'>Register</p>
            </nav>
        );

    }


    
}

export default Navigation;