import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import { APIManager } from '../../utils'

class CreatePost extends Component {

	constructor(){
		super()
		this.state = {
			post: {
				image: '',
				caption: ''
			}
		}
	}

	updatePost(event){
		event.preventDefault()
		let updated = Object.assign({}, this.state.post)
		updated[event.target.id] = event.target.value
		this.setState({
			post: updated
		})
	}

	submitPost(event){
		event.preventDefault()
//		console.log('subimtPost: '+JSON.stringify(this.state.post))

		if (this.state.post.image.length == 0){
			alert('Please add an image first.')
			return
		}

		if (this.state.post.caption.length == 0){
			alert('Please add a caption.')
			return
		}

		let updated = Object.assign({}, this.state.post)
		this.props.onCreate(updated)
	}

	imageSelected(files){
		console.log('imageSelected: ')
		const image = files[0]

		const cloudName = 'dcxaoww0c'
		const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

		const timestamp = Date.now()/1000
		const uploadPreset = 'rnxsz09i'

		const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'rVxIqxqsbdcxTo4X6bo9rUqkQms'

		const signature = sha1(paramsStr)
		const params = {
			'api_key': '399938195648612',
			'timestamp': timestamp,
			'upload_preset': uploadPreset,
			'signature': signature
		}

		APIManager.uploadFile(url, image, params)
		.then((uploaded) => {
			console.log('Upload Complete: '+JSON.stringify(uploaded))
			let updated = Object.assign({}, this.state.post)
			updated['image'] = uploaded['secure_url']
			this.setState({
				post: updated
			})

			// Cloudinary returns this:
			// {"public_id":"w2wah5zepcihbdvpky3v","version":1484004334,"signature":"cee9e534a282591c60fb83f8e7bdb028108ab6b3","width":360,"height":360,"format":"png","resource_type":"image","created_at":"2017-01-09T23:25:34Z","tags":[],"bytes":21776,"type":"upload","etag":"d5d83eeac7bc222569a7cef022426c9f","url":"http://res.cloudinary.com/dcxaoww0c/image/upload/v1484004334/w2wah5zepcihbdvpky3v.png","secure_url":"https://res.cloudinary.com/dcxaoww0c/image/upload/v1484004334/w2wah5zepcihbdvpky3v.png","original_filename":"apple"}

		})
		.catch((err) => {
			alert(err)
		})


	}

	render(){
		return (
			<div>
				Create Post
				<Dropzone onDrop={this.imageSelected.bind(this)} style={{border:'none'}}>
					<button className="button special small">Upload Image</button>
				</Dropzone>
				<input id="caption" onChange={this.updatePost.bind(this)} type="text" placeholder="Caption" style={{margin:"20"}} />
				<button className="button special small" onClick={this.submitPost.bind(this)}>Submit</button>
			</div>
		)
	}
}

export default CreatePost