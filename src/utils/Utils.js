import {
    API_URL,
    FINISH_PASSWORD_RESET_URL,
    INIT_PASSWORD_RESET_URL,
    LOGIN_URL,
    LOGOUT_URL,
    REGISTER_URL,
    TOKEN_URL,
    USER_URL
} from "./Constants";

export function saveTokens({accessToken, refreshToken}) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const checkResponse = async (response) => {
    if (response.ok) {
        return response.json();
    }

    return response.json()
        .then((err) => {
            const error = new Error(err.message);
            error.status = response.status;
            throw error;
        });
};

export const sendRequest = async (url, options) => {
    return fetch(`${API_URL}${url}`, options)
        .then(checkResponse);
};

export const register = async (userData) => {
    const response = await sendRequest(REGISTER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
    });

    if (response.success) {
        saveTokens(response);
        return response.user;
    }

    return Promise.reject("Can't register");
}

export const login = async (email, password) => {
    const response = await sendRequest(LOGIN_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    });

    if (response.success) {
        saveTokens(response);
        return response.user;
    }

    return Promise.reject("Can't login");
};

export const logout = async () => {
    const token = localStorage.getItem("refreshToken");
    return token
        ? sendRequest(LOGOUT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token}),
        })
        : Promise.reject(new Error("No refresh token"));
};

export const resetPassword = async (email) => {
    const response = await sendRequest(INIT_PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
    });

    return response.success
        ? Promise.resolve()
        : Promise.reject("Can't reset password");
};

export const finishResetPassword = async (password, token) => {
    const response = await sendRequest(FINISH_PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password, token}),
    });

    return response.success
        ? Promise.resolve()
        : Promise.reject("Can't reset password");
};

export const refreshToken = async () => {
    const token = localStorage.getItem("refreshToken");
    return token
        ? sendRequest(TOKEN_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token}),
        })
        : Promise.reject(new Error("No refresh token"));
};

export const fetchWithAuth = async (url, method, requestData = null, attempts = 0) => {
    if (attempts >= 2) {
        return Promise.reject(new Error("Can't fetch data"));
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
        return Promise.reject(new Error("No access token"));
    }

    try {
        return await sendRequest(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: requestData && JSON.stringify(requestData),
        });
    } catch (error) {
        if (error.message === "jwt expired") {
            const newTokenData = await refreshToken();
            if (newTokenData.success) {
                saveTokens(newTokenData);
                return fetchWithAuth(url, method, requestData, attempts + 1);
            }
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
};

export const getUserProfile = async () => {
    const response = await fetchWithAuth(USER_URL, "GET");
    return response.success
        ? Promise.resolve(response.user)
        : Promise.reject("Can't get user profile");
};

export const updateUserProfile = async (profile) => {
    const response = await fetchWithAuth(USER_URL, "PATCH", profile);
    return response.success
        ? Promise.resolve(response.user)
        : Promise.reject("Can't update user profile");
};
