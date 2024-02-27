import ColorPalette from '../components/ColorPalette'
import SignUp from '../features/SignUp'

export default function SignUpPage() {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<SignUp />
			<ColorPalette />
		</div>
	)
}