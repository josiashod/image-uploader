import React from 'react';

const gray = {
    2: "#4F4F4F",
    3: "#828282",
    4: "#BDBDBD",
    6: "#F2F2F2"
  }
  
const styles = {
    h1: {
      fontSize: 18,
      letterSpacing: '-3,5%',
      lineHeight: '27px',
      color: gray[2]
    },
  
    loaderContainer: {
      backgroundColor: gray[6],
    },
  }

export default function Uploading () {
  
  return (<div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 py-4 md:py-8 shadow-md rounded-lg w-4/5 md:w-2/4 lg:w-2/5 xl:w-2/6 bg-white px-8 ">
    <h1 style={styles.h1}>Uploading... </h1>
    <div className="loader h-2 relative overflow-hidden mt-4 rounded-lg" style={styles.loaderContainer}></div>
  </div>)
}