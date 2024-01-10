export default {
    async fetchLists() {
        try {
            const response = await fetch('http://localhost:3000/api/lists')
            if (!response.ok) throw new Error('error fetching data')
            const data = await response.json()
            console.log(data)
            return data
        } catch (err) {
            console.log(err)
        }
    },

    async postList() {
        try {
            const response = await fetch('http://localhost:3000/api/lists', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: 'thikks hjjis aaa tehst tfglkhitle',
                    list_description: 'this is a test list description',
                    users_id: 1
                })
            })
            console.log(response)
            const result = await response.json()
            if (!response.ok) throw new Error('error posting data')
            console.log(result)
            //return result
        } catch (err) {
            console.error(err)
            //return err
        }
    }
}