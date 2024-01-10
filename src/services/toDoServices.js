export default {
    async fetchToDos() {
        try {
            const response = await fetch('http://localhost:3000/api/to_dos')
            if (!response.ok) throw new Error('error fetching data')
            const data = await response.json()
            return data
        } catch (err) {console.log(err)}
    }
}