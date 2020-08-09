import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar, Button } from '@material-ui/core';
import { db } from '../firebase';
import { TextField } from '@material-ui/core';
import firebase from 'firebase';

const Post = ({ username, caption, image, postId, user }) => {
	const [ comments, setComments ] = useState([]);
	const [ comment, setComment ] = useState('');
	useEffect(
		() => {
			let unsubscribe;

			if (postId) {
				unsubscribe = db
					.collection('posts')
					.doc(postId)
					.collection('comments')
					.orderBy('timeStamp', 'asc')
					.onSnapshot((snap) => {
						setComments(snap.docs.map((doc) => doc.data()));
					});
			}
			return () => {
				unsubscribe();
			};
		},
		[ postId ]
	);

	const postComment = (event) => {
		event.preventDefault();

		db.collection('posts').doc(postId).collection('comments').add({
			text: comment,
			username: user.displayName,
			timeStamp: firebase.firestore.FieldValue.serverTimestamp()
		});
		setComment('');
	};

	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	return (
		<div className="Post">
			<div className="Post__header">
				<Avatar alt={username} src="/static/images/avatar/1.jpg" className="Post__avatar" />

				<h4 style={{ fontWeight: '600' }}>{username}</h4>
			</div>
			<img className="Post__image" src={image} alt="" />
			<h4 className="Post__text">
				<b style={{ fontWeight: '500' }}>{username} :</b> {caption}
			</h4>
			<div className="Post__comments">
				{comments.map((comment) => (
					<p>
						<strong style={{ fontWeight: '500' }}>{comment.username} :</strong> {comment.text}
					</p>
				))}
			</div>
			{user ? (
				<form className="Post__form" onSubmit={(e) => e.preventDefault()}>
					<TextField
						variant="outlined"
						type="text"
						className="Post__input"
						value={comment}
						placeholder="Add a comment.."
						onChange={(e) => setComment(e.target.value)}
					/>

					<Button
						className="Post__button"
						type="submit"
						disabled={!comment}
						variant="contained"
						onClick={postComment}
						color="primary">
						submit
					</Button>
				</form>
			) : (
				<h4 className="Post__exception" onClick={scrollToTop}>
					{' '}
					Sign-in to Comment{' '}
				</h4>
			)}
		</div>
	);
};

export default Post;
