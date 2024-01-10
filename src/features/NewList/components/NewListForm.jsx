import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import listServices from '../../../services/listServices'


function NewListForm() {
    // //const {entry, error} = usePractice({})
    // const [newEntry, setNewEntry] = useState({})
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState(null)
    
	const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { 
            errors, 
            isValid, 
            isSubmitted } 
    } = useForm()
        
    const onSubmit = async(data) => {
        console.log(data)
        // listServices.postList()
        // const listObject = {
        //     title: data.listTitle,
        //     list_description: data.listDescription,
        //     users_id: 1,
        // }
        // try {
        //     setIsLoading(true)
        //     if (!response.ok) return new Error(`ERROR ${response.status} fetching ${response.url}`)
        //     const confirmation = await response.json()
        //     setNewEntry(confirmation)            
        //     setIsLoading(false)
        //     setError(null)
        // } catch (err) {
        //     console.error(err)
        //     setError(err)
        //     setIsLoading(false)
        // }
    }

    const onCancel = () => {
        reset()
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <h3 className="text-2xl | mb-5">Enter New List Information</h3>
                        
            <div className="mt-2 mb-4">
                <p className="my-2">List Title:</p>
                <input 
                    { ...register('listTitle', { required: true, minLength: 5, maxLength: 25, } ) } 
                    className="text-black | p-1 | rounded-md focus:outline-sky-500" 
                    type="text"
                    id="new-list-title"
                ></input>
                { (errors.listTitle?.type === 'minLength' && isSubmitted) && <p className='text-rose-500'>minimum five characters required</p>}
                { (errors.listTitle?.type === 'required' && isSubmitted) && <p className='text-rose-500'>field required</p>}
                { (errors.listTitle?.type === 'maxLength' && isSubmitted) && <p className='text-rose-500'>maximum 25 character</p>}
            </div>
            
            <div className="my-2">
                <p className="my-2">List Description:</p>
                <textarea
                    { ...register('list_description') } 
                    className="text-black | p-1 | rounded-md focus:outline-sky-500" 
                    id="new-list-description" 
                    cols="25" rows="3" 
                    placeholder="optional: provide a brief list description"
                ></textarea>
            </div>
            
            <div className="my-2">
                
                <button 
                    id="new-list-cancel" 
                    className="bg-sky-500 | w-20 py-2 px-3 mr-1 mt-5 | rounded-md focus:outline-sky-500" 
                    type="button"
                    onClick={onCancel}
                >cancel</button>
                
                <button
                    id="new-list-submit"
                    className={"w-20 py-2 px-3 ml-1 mt-5 rounded-md focus:outline-sky-500 " + (isValid? "bg-sky-500": "bg-sky-800")}
                    type="submit"
                >submit</button>
          
            </div>
            {/* { newEntry?.title && <p>{ newEntry.title}</p>}
            { newEntry?.body && <p>{ newEntry.body}</p>}
            { error && <p>{ error.message }</p>} */}
               
        </form>
    )
}

export default NewListForm
