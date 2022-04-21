import Constants from "expo-constants";

const settings = {
	// IPv4 Address (ipconfig):port
	dev: {
		apiUrl: "https://classified-app-backend.herokuapp.com/api",
	},
	staging: {
		apiUrl: "https://classified-app-backend.herokuapp.com/api",
	},
	prod: {
		apiUrl: "https://classified-app-backend.herokuapp.com/api",
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === "staging")
		return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();