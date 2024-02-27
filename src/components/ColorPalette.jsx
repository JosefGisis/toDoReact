export default function ColorPalette() {
	const colors = [
		'bg-primary',
		'bg-secondary',
		'bg-accent',
		'bg-neutral',
		'bg-base-100',
		'bg-base-200',
		'bg-base-300',
		'bg-info',
		'bg-success',
		'bg-warning',
		'bg-error',
	]

	return (
		<div className="m-10">
			{colors.map((color, index) => (
				<div key={index} className={color}>
					<p>{color}</p>
				</div>
			))}
		</div>
	)
}
