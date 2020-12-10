import React from 'react';
// import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {

    const boxStyle = {
        position: 'absolute',
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol,
        boxShadow: '0 0 0 3px #149df2 inset',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        cursor: 'pointer',

    }
    

    return(
        <div className='center ma'> 
        <div className = 'absolute mt2'>
            <img id='inputimage' alt=""src= {imageUrl} width='300px' height='auto' />
            <div className='bounding-box'
            style={boxStyle}></div>
        </div>
        </div>
    );
}

export default FaceRecognition;