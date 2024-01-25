import { useContext, useEffect, useState } from "react"
import ActiveListContext from "../../../state-management/ActiveList/ActiveListContext"

const useActiveListInfo = () => {
    const { activeList } = useContext(ActiveListContext)
    const [creationDate, setCreationDate] = useState(null)
    const [title, setTitle] = useState(null)

    useEffect(() => {
        setTitle(activeList.title)
        const date = activeList.creationDate.split('T')[0]
        setCreationDate(new Date(date).toDateString())

    }, [activeList])

    return { title, creationDate }
}

export default useActiveListInfo