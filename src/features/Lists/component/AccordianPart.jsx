export default function AccordionPart({ children }) {
	return (
		<div className="collapse collapse-plus bg-neutral">
			<input type="radio" name="my-accordion-3" checked="checked" />
			<div className="collapse-title text-xl font-medium">{children}</div>
			<div className="collapse-content">
				<p>created: 01/02/2024</p>
			</div>
		</div>
	)
}
