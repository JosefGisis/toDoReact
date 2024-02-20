import List from './List'

export default function ToDoListsList({ orderedLists }) {
	return (
		<div>
			<div>
				{orderedLists?.map?.((list, index) => (
					<div key={index}>
						<List listData={list}></List>
					</div>
				)) || null}
			</div>
		</div>
	)
}
