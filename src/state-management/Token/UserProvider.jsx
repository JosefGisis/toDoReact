import UserContext from "./UserContext.js"

function UserProvider({ children }) {
	return <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}

export default UserProvider