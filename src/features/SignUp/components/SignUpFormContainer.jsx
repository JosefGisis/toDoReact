function SignUpFormContainer({ children }) {
	return (
        <div className="flex w-screen h-screen items-center content-center justify-center">
            <div className="flex flex-col items-center content-center bg-slate-700 w-[30rem] px-[5rem] py-6 rounded-xl">
                {children}
            </div>
        </div>
	)
}
export default SignUpFormContainer