import { useCallback, useEffect, useState } from "react"

export default function Lists() {
    const [lists, setLists] = useState()
    const [selectedListId, setSelectedListId] = useState()
    const {getLists, create} = useLists()


    const retrieveLists = useCallback(async ()=>{
        const result = getLists()
        setLists(result)
    },[])

    useEffect(()=>{
        retrieveLists()
    },[])

    const handleCreateList = async function(newListData){
        const newList = await create(newListData)
        setLists(prev=>([...prev, newList]))
    }

    const handleSelect = useCallback((id)=>{
        setSelectedListId(id)
    },[])

    return (
        <div>
            <ToDoLists data={data} selectedId={selectedListId} onSelect={handleSelect}/>
            <NewList onSubmit={handleCreateList} />
        </div>

    )
}