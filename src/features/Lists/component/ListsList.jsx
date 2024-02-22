import List from './List'
import NoListMessage from './NoListsMessage'

export default function ToDoListsList({ orderedLists }) {
	return (
			<div>

				{ orderedLists?.length ? orderedLists?.map?.((list, index) => (
					<div key={index}>
						<List listData={list}></List>
					</div>
				)) : <NoListMessage />}
			</div>
	)
}
