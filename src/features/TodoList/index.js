import React, { useState, useEffect } from "react";
import { Button, Card, Checkbox, Divider, Form, Input, Typography } from "antd";
import { List } from "antd/lib/form/Form";
import { CloseCircleOutlined } from "@ant-design/icons/lib/icons";
import "./styles.css";

const { Title } = Typography;

const TodoList = () => {
	const [form] = Form.useForm();
	const [listTodo, setListTodo] = useState([]);
	const [listDone, setListDone] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const [item, setItem] = useState({});
	const [isSettingDone, setIsSettingDone] = useState(false);
	const [itemDone, setItemDone] = useState({});
	const [isRemoving, setIsRemoving] = useState(false);
	const [itemToRemove, setItemToRemove] = useState();

	useEffect(() => {
		if (isAdding) {
			let aux = listTodo;
			aux.push(item);
			setListTodo(aux);
			form.resetFields();
			setIsAdding(false);
		}
	}, [isAdding, listTodo, item, form]);

	useEffect(() => {
		if (isSettingDone) {
			let auxDone = listDone;

			if (itemDone.checked) {
				auxDone[itemDone.key] = itemDone;
			} else {
				auxDone.splice(itemDone.key, 1);
			}
			setListDone(auxDone);
			setIsSettingDone(false);
		}
	}, [isSettingDone, listDone, itemDone]);

	useEffect(() => {
		if (isRemoving) {
			let auxTodo = listTodo;
			let auxDone = listDone;

			if (auxDone.length > 0) {
				console.log(auxDone)
				auxDone.splice(itemToRemove, 1)
				setListDone(auxDone);
			}

			auxTodo.splice(itemToRemove, 1);
			setListTodo(auxTodo);
			setIsRemoving(false);
		}
	});

	const onChangeChk = (id, checked) => {
		let auxTodo = listTodo;
		auxTodo[id].checked = checked;
		setListTodo(auxTodo);
		setItemDone(auxTodo[id]);
		setIsSettingDone(true);
	};

	const onRemove = (id) => {
		setItemToRemove(id);
		setIsRemoving(true);
	};
	const onFinish = (values) => {
		let item = {
			key: listTodo.length,
			text: values.task,
			checked: false,
		};
		setItem(item);
		setIsAdding(true);
	};
	return (
		<Card className='todo-list'>
			<Title level={2}>Things To Do</Title>
			<Divider/>
			<ul className='ul-todo-list'>
				{isAdding || isRemoving
					? "Loading"
					: listTodo.map((item, index) => (
							<li className='li-todo-list'>
								<Checkbox
									key={index}
									defaultChecked={item.checked}
									onChange={(values) =>
										onChangeChk(
											index,
											values.target.checked,
										)
									}
								>
									{item.text}
								</Checkbox>
								<Button
									key={index + 1}
									onClick={() => onRemove(index)}
								>
									<CloseCircleOutlined />
								</Button>
							</li>
					  ))}
			</ul>
			<Divider/>
			<Title level={2}>
				DONE: {listDone.filter((item) => item !== undefined).length}{" "}
			</Title>
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					name={"task"}
					rules={[
						{
							required: true,
							message: "Field is required",
						},
					]}
				>
					<Input
						autoFocus={true}
						placeholder="Enter new task"
					></Input>
				</Form.Item>
				<Button type="primary" htmlType="submit">
					Add Task
				</Button>
			</Form>
		</Card>
	);
};

export default TodoList;
