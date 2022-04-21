import { useContext } from 'react';
// import jwtDecode from "jwt-decode";

import AuthContext from './context'
import authStorage from './storage';

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const logOut = () => {
        setUser(null);
        authStorage.removeToken();
    };

    const logIn = (data) => {
        const user = data.user;
        setUser(user);
        authStorage.storeToken(data.tokens.access.token);
        authStorage.storeUser(data.user);
    };

    return { user, logIn, logOut };
}

export default useAuth;