import './App.css';
import React from 'react';
import Uploader from './Uploader.js'
import Uploading from './Uploading.js'


class App extends React.Component
{
  constructor(props){
    super(props)
    
    this.state = {
      file: '',
      uploading: false
    }
  }

  onFileInputChange = (event) => {
    const { files } = event.target;
    this.setState({
      uploaded: true,
      uploading: false,
    })
  }

  UploadFile = async () => {
    const form = new FormData();
    form.append("image", );

    fetch("http://localhost:3001/upload", {
      "method": "POST",
    })
    .then(async response => {
      if(!response.ok)
        return Promise;
      return response
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.error(err);
    });
  }

  render(){
    const {uploading, file} = this.state
    return (<>
        {( !uploading && !file ) ? <Uploader handleInputFile={this.onFileInputChange} /> :(
          (uploading && !file) ? <Uploading /> : <h1>nothing</h1>
        ) }
        {/* <Uploader handleInputFile={onFileInputChange} /> */}
        {/* <Uploading /> */}
    </>)
  }

}

export default App;
