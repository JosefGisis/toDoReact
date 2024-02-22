import { GoCalendar } from 'react-icons/go'

export default function DueDate({ dueDate }) {
	const currentDate = new Date().setHours(0, 0, 0, 0)
	const dueDateComparison = new Date(dueDate).setHours(0, 0, 0, 0)

	const due = dueDateComparison === currentDate
	const overDue = dueDateComparison < currentDate

    const formattedDate = new Date(dueDate).toDateString()

	return (
		<>
			<GoCalendar className="mr-2" />
			<p className={' ' + (due ? 'text-yellow-500' : overDue ? 'text-rose-500' : 'text-green-500')}>{ formattedDate }</p>
			{/* <p className={due ? 'text-warning' : overDue ? 'text-error' : 'text-success'}>{due ? ' | due today' : overDue ? ' | over-due!' : ''}</p> */}
		</>
	)
}
