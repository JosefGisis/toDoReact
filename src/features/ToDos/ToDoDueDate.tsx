import { GoCalendar } from 'react-icons/go'

// Renders the due date of a todo item.
export default function ToDoDueDate({ dueDate, completed }: { dueDate: string; completed: boolean }) {
	// need to remove UTC and get local date (UTC is 4 hours ahead of EST)
	const localDate = dueDate?.split('Z')[0]

	// prepare currentDate and dueDateComparison for comparison by removing hours
	const currentDate = new Date().setHours(0, 0, 0, 0)
	const dueDateComparison = new Date(localDate).setHours(0, 0, 0, 0)

	// Check is to-do is due today
	const due = dueDateComparison === currentDate
	// Check if to-do is overdue
	const overDue = dueDateComparison < currentDate

	// formatting date to add to to-do component
	const formattedDate = new Date(localDate).toDateString()

	const textColor = completed ? 'text-success' : due ? 'text-warning' : overDue ? 'text-error' : 'text-success'

	return (
		<>
			<GoCalendar className="mr-2 flex-none" />
			<p className={textColor}>{formattedDate}</p>
		</>
	)
}
