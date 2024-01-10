export default {
    async fetchUsers() {
        return fetch('http://localhost:3000/api/users')
            .then(res => {return res.json()})
            .then(data => {return data})
            .catch(err => console.log(err))
    }
}
