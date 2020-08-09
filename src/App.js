import React, { useState, useEffect } from 'react';
import './App.css';
import instagram_logo from './Assets/instagram_logo.png';
import Post from './Components/Post';
import { db, auth } from './firebase';
import ImageUpload from './Components/ImageUpload';
import { Modal, Button, TextField } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

function App() {
	const [ posts, setPosts ] = useState([]);
	const [ modalStyle ] = useState(getModalStyle); //modal style
	const [ username, setUsername ] = useState(''); //form
	const [ email, setEmail ] = useState(''); //form
	const [ password, setPassword ] = useState(''); //form
	const [ open, setOpen ] = useState(false); //to open form
	const [ openSignin, setOpenSignin ] = useState(false); //for signin
	const [ user, setUser ] = useState(null); //auth
	useEffect(() => {
		db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
			setPosts(
				snapshot.docs.map((docs) => ({
					id: docs.id,
					post: docs.data()
				}))
			);
		});
	}, []);

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged((authUser) => {
				if (authUser) {
					//user logged in

					setUser(authUser);
				} else {
					//user logged out
					setUser(null);
				}
			});

			return () => {
				//cleanup work
				unsubscribe();
			};
		},
		[ user, username ]
	); //--> whenever user or username changes it just reload its components

	const handleSignup = (event) => {
		event.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username
				});
			})
			.then(() => alert('User account created successfully!!'))
			.catch((err) => alert(err.message));

		setOpen(false);
	};

	const handleSignin = (event) => {
		event.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => alert(`User signed in successfully!!`))
			.catch((err) => alert(err));

		setOpenSignin(false);
	};

	const handleSignout = (event) => {
		event.preventDefault();
		auth.signOut().then(() => alert('User signed out successfully!!'));
	};

	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	return (
		<div className="App">
			<div className="App__header">
				<img className="App__logo" src={instagram_logo} alt="instagram_logo" />
				<div className="Modal__authContainer">
					{user ? (
						<Button color="primary" variant="contained" onClick={handleSignout}>
							Logout
						</Button>
					) : (
						<div className="Auth__div">
							<div className="Auth__signup">
								<Button color="primary" variant="contained" onClick={() => setOpen(true)}>
									Signup
								</Button>
							</div>
							<div className="Auth__signin">
								<Button color="primary" variant="contained" onClick={() => setOpenSignin(true)}>
									Signin
								</Button>
							</div>
						</div>
					)}
				</div>
				<div>
					<Modal open={open} onClose={() => setOpen(false)} onSubmit={(e) => e.preventDefault()}>
						<div style={modalStyle} className="Modal__paper">
							<form className="Modal__form" onSubmit={(e) => e.preventDefault()}>
								<center>
									<img className="App__logo" src={instagram_logo} alt="instagram_logo" />
								</center>
								<TextField
									type="text"
									placeholder="username"
									value={username}
									variant="outlined"
									onChange={(e) => setUsername(e.target.value)}
								/>
								<TextField
									type="email"
									placeholder="email"
									value={email}
									variant="outlined"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<TextField
									type="password"
									placeholder="password"
									value={password}
									variant="outlined"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="Modal__signup">
									<Button type="submit" color="primary" variant="contained" onClick={handleSignup}>
										Sign Up
									</Button>
								</div>
							</form>
						</div>
					</Modal>
					<Modal open={openSignin} onClose={() => setOpenSignin(false)}>
						<div style={modalStyle} className="Modal__paper">
							<form className="Modal__form" onSubmit={(e) => e.preventDefault()}>
								<center>
									<img className="App__logo" src={instagram_logo} alt="instagram_logo" />
								</center>

								<TextField
									className="Modal__input"
									type="email"
									variant="outlined"
									placeholder="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<TextField
									className="Modal__input"
									type="password"
									variant="outlined"
									placeholder="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="Modal__signin">
									<Button
										className="Modal__input"
										type="submit"
										color="primary"
										variant="contained"
										onClick={handleSignin}>
										Sign In
									</Button>
								</div>
							</form>
						</div>
					</Modal>
				</div>
			</div>

			<div className="App__post">
				<div className="App__postLeft">
					{posts.map(({ post: { username, caption, imageUrl }, id }) => {
						return (
							<Post
								username={username}
								user={user}
								caption={caption}
								image={imageUrl}
								key={id}
								postId={id}
							/>
						);
					})}
				</div>
				<div className="App__postRight">
					<InstagramEmbed
						url="https://www.instagram.com/p/BWjb9sHni5u/"
						maxWidth={320}
						hideCaption={false}
						containerTagName="div"
						protocol=""
						injectScript
						onLoading={() => {}}
						onSuccess={() => {}}
						onAfterRender={() => {}}
						onFailure={() => {}}
					/>

					<InstagramEmbed
						url="https://www.instagram.com/p/CCkmp4KAKq-/"
						maxWidth={320}
						hideCaption={false}
						containerTagName="div"
						protocol=""
						injectScript
						onLoading={() => {}}
						onSuccess={() => {}}
						onAfterRender={() => {}}
						onFailure={() => {}}
					/>

					<InstagramEmbed
						url="https://www.instagram.com/p/CAp1FxoH70A/"
						maxWidth={320}
						hideCaption={false}
						containerTagName="div"
						protocol=""
						injectScript
						onLoading={() => {}}
						onSuccess={() => {}}
						onAfterRender={() => {}}
						onFailure={() => {}}
					/>
					<InstagramEmbed
						url="https://www.instagram.com/p/B7VV0vEpMZO/"
						maxWidth={320}
						hideCaption={false}
						containerTagName="div"
						protocol=""
						injectScript
						onLoading={() => {}}
						onSuccess={() => {}}
						onAfterRender={() => {}}
						onFailure={() => {}}
					/>
				</div>
			</div>

			{user ? (
				<div className="App__upload">
					<ImageUpload username={user.displayName} />
				</div>
			) : (
				<Button variant="outlined" color="primary" className="App__loginfirst" onClick={scrollToTop}>
					Sign-in to Post
				</Button>
			)}
		</div>
	);
}

export default App;
