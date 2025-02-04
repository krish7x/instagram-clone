import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './ImageUpload.css';
import { storage, db } from '../../firebase/firebase';
import firebase from 'firebase';

const ImageUpload = ({ username }) => {
	const [ image, setImage ] = useState(null);
	const [ caption, setCaption ] = useState('');
	const [ progress, setProgress ] = useState(0);

	const handleCaption = (event) => {
		setCaption(event.target.value);
	};

	const handleFile = (event) => {
		if (event.target.files[0]) {
			setImage(event.target.files[0]);
		}
	};

	const handleClick = (event) => {
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		//upload Task Function
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				//progress function
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				setProgress(progress);
			},
			(err) => {
				console.log(err);
				alert(err.message);
			},
			() => {
				//Complete function
				storage.ref('images').child(image.name).getDownloadURL().then((url) => {
					db.collection('posts').add({
						timestamp: firebase.firestore.FieldValue.serverTimestamp(),
						caption: caption,
						imageUrl: url,
						username: username
					});

					setProgress(0);
					setCaption('');
					setImage(null);
				});
			}
		);
	};

	return (
		<div className="ImageUpload">
			<progress className="ImageUpload__progress" value={progress} max={100} />
			<TextField
				variant="outlined"
				color="primary"
				type="text"
				value={caption}
				className="ImageUpload__caption"
				placeholder="Write Caption..."
				onChange={handleCaption}
			/>
			<TextField type="file" onChange={handleFile} />
			<Button onClick={handleClick} variant="contained" color="secondary">
				Upload
			</Button>
		</div>
	);
};

export default ImageUpload;
