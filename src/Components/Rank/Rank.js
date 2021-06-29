import React from 'react';

const Rank = ({name,entries})=>{
    return (
        <div>
            <div className='white f3'>
                {`${name}, You have detected`}
            </div>
            <div className='white f1'>
                {`${entries}`}
            </div>
            <div className='white f2'>
                {`faces`}
            </div>

        </div>
    );
}

export default Rank;