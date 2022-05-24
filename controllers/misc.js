const User = require("../models/user");
const Game = require("../models/game");
const Question = require("../models/question");

const {
	isSignedIn,
	isAuthenticated,
	getErrorMessageInJson,
	sendUserResponse,
	sendResponse,
} = require("../controllers/base");

const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");

const firebaseConfig = {
	apiKey: "AIzaSyAjX_vZ8jMUUs1fLklwNkugpVgrl1ILimM",
	authDomain: "math-your-brain.firebaseapp.com",
	projectId: "math-your-brain",
	storageBucket: "math-your-brain.appspot.com",
	messagingSenderId: "816476247432",
	appId: "1:816476247432:web:8491e91d286be70647963d",
	measurementId: "G-FG200FNBW1",
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const {
	getStorage,
	ref,
	listAll,
	getDownloadURL,
} = require("firebase/storage");

const storage = getStorage(firebaseApp);
const avatarRef = ref(storage, "avatars");

exports.getAllAvatars = (req, res) => {
	var links = [];
	listAll(avatarRef).then((refs) => {
		console.log("LENGTH", refs.items.length);
		refs.items.forEach((itemRef) => {
			getDownloadURL(itemRef).then((url) => {
				console.log("DWONLOAD URL", url);
				links.push(url);
				if (links.length == refs.items.length) {
					return sendResponse(res, { avatarLinks: links });
				}
			});
		});
	});
};
