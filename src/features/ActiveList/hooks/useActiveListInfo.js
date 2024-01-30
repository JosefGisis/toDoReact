import { useContext, useEffect, useState } from "react"
import ActiveListContext from "../../../state-management/List/ListContext"

const useActiveListInfo = () => {
    const { activeList } = useContext(ActiveListContext)
    const [creationDate, setCreationDate] = useState(null)
    const [title, setTitle] = useState(null)

    useEffect(() => {
        setTitle(activeList?.title)
        setCreationDate(activeList?.creationDate)
    }, [activeList])

    return { title, creationDate }
}

export default useActiveListInfo