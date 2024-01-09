import { useForm } from 'react-hook-form'

function NewListForm() {
	const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { 
            errors, 
            isValid, 
            isSubmitted } 
        } = useForm()

    const onSubmit = (data) => {
        console.log(data)
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
            </div>
            
            <div className="my-2">
                <p className="my-2">List Description:</p>
                <textarea
                    { ...register('listDescription') } 
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
            
        </form>
    )
}

export default NewListForm
