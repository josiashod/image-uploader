import './App.css';
import React from 'react';
import Uploader from './Uploader.js'
import Uploading from './Uploading.js'
import Uploaded from './Uploaded.js'


class App extends React.Component
{
  constructor(props){
    super(props)
    
    this.state = {
      file: '',
      uploading: false,
      error: '',
      copied: false
    }
  }

  onFileInputChange = (event) => {
    const { files } = event.target;
    this.setState({
      uploading: true,
    })

    this.UploadFile(files[0])
  }

  UploadFile = async (file) => {
    const form = new FormData();
    form.append("image", file);

    await fetch("http://localhost:3001/api/upload/", {
      "method": "POST",
      body: form
    })
    .then(response => {
      if(!response.ok)
        return Promise.reject(response)
      return response.json()
    })
    .then(response => {
      // console.log('response', response.file)
      this.setState({
        file: document.location + response.file.replace('public/','')
      })
    })
    .catch(err => {

      err.json().then(value => {
        value = value.replace(/\/|Error: /g,'')
        this.setState({
          uploading: false,
          error: value
        })
      });

    });
  }

  copiedLlink = () => {
    this.setState({
      copied: true
    })
  } 

  componentDidUpdate(){
    if (this.state.copied) {
      setTimeout(() => {this.setState({copied:false})}, 3000);      
    }
  }

  back = () => {
    // console.log('back')
    this.setState({
      file: '',
      uploading: false,
      error: '',
      copied: false
    })
  }

  render(){
    const { copied, uploading, file, error } = this.state
    return (<>
        {( !uploading && !file ) ? <Uploader handleInputFile={this.onFileInputChange} errorMessage={error} /> :(
          (uploading && !file) ? <Uploading /> : <Uploaded file={file} handleCopied={this.copiedLlink} back={this.back} />
        ) }

      <div style={{backgroundColor:"#219653"}} className={`shadow-md text-white absolute  transition-all duration-700 left-1/2 transform -translate-x-1/2 w-32 py-2 text-center rounded-lg text-sm + ${copied ? "top-6" : "-top-1/2"}`} >Link copied</div>
    </>)
  }

}

export default App;
