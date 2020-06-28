import React from 'react';
import {FaBookDead} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div style={{height:'100vh', justifyContent:'center', alignItems:'center', display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <div style={{color:'#281e5a', fontSize:'250px', padding:'20px'}}>
                        <FaBookDead />
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', padding:'20px'}}>
                        <div style={{color:'#281e5a', fontSize:'150px'}}>
                            404 
                        </div>
                        <div style={{color:'#281e5a', fontSize:'35px', marginTop:'-40px', marginBottom:'25px'}}>
                            Page Not Found
                        </div>
                        <div style={{color:'#281e5a', fontSize:'18px'}}>
                            You've reached forbidden book
                        </div>
                    </div>
                </div>
                <div style={{width:'50%'}}>
                    <Link to='/'>
                        <button className='buttoncart' style={{borderRadius:'15px'}} >Go to Homepage</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound