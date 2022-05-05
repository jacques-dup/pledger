export const makeAuthHeaderConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
}