export default {
    async fetchLists() {
        try {
            const response = await fetch('http://localhost:3000/api/lists')
            if (!response.ok) throw new Error('error fetching data')
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err)
        }
    },

    async postList(data) {
        try {
            const response = await fetch('http://localhost:3000/api/lists', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error('error posting data')
            const result = await response.json()
            return result
        } catch (err) {
            console.error(err)
            return err
        }
    }
}