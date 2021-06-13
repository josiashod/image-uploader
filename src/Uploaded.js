import React from 'react';
import defaultImage from './pexels-artem-beliaikin-2344530.jpg'

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
  
    check:{
        color: "#219653",
      },

    imageLink:{
        fontSize: 8,
        color: gray[2]
    },

    linkContainer: {
        padding: '2px'
    },

    copyButton:{
        fontSize: 12,
        color: "#ffffff",
        backgroundColor: "#2F80ED",
        border: "1px solid transparent",
        padding: "9px 22px",
        fontFamily: "'Noto sans', sans-serif"
    }
  }

export default function Uploaded ({ file, handleCopied }) {
    const linkUrl = React.useRef(null);

    const copyFileLink = () => {
        const el = document.createElement('textarea');
        el.value = file;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        handleCopied();
    }
  
    return (<div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 py-4 md:py-8 shadow-md rounded-lg w-4/5 md:w-2/4 lg:w-2/5 xl:w-2/6 bg-white px-8 ">
        <svg xmlns="http://www.w3.org/2000/svg" style={styles.check} fill="currentColor" className="h-10 w-10 mb-2 mx-auto" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <h1 style={styles.h1} className="text-center mb-6" >Uploaded Successfully!</h1>
        <div className="h-64 md:h-72 mb-4 rounded-lg" style={{backgroundColor: gray[6]}}>
            <img src={file} className="w-auto mx-auto h-full rounded-lg" alt="uploaded file"/>
        </div>

        <div className="border border-gray rounded-lg flex justify-between" style={styles.linkContainer}>
            <div className="ml-2 w-4/6 truncate self-center" style={styles.imageLink} >{file}</div>
            <button className="rounded-lg" style={styles.copyButton} onClick={copyFileLink} >Copy</button>
        </div>
    </div>)
}

Uploaded.defaultProps = { file: defaultImage}