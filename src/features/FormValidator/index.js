import React, { useState, useEffect } from "react";
import {
	Card,
	Typography,
	Input,
	Form,
	InputNumber,
	Select,
	Radio,
    Button,
} from "antd";
import MaskedInput from "antd-mask-input";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const sizes = [
	{ label: "XS", value: "XS" },
	{ label: "S", value: "S" },
	{ label: "M", value: "M" },
	{ label: "L", value: "L" },
	{ label: "XL", value: "XL" },
	{ label: "XXL", value: "XXL" },
];

const FormValidator = () => {
	const [form] = Form.useForm();
	const [maskPhone, setmaskPhone] = useState("(111) 111-1111");
	const [maskCode, setmaskCode] = useState("#1# 1#1");

	return (
		<Card>
			<Title>Form Validator</Title>
			<Form form={form} layout="vertical">
				<Form.Item
					name="first_name"
					rules={[
						{
							required: true,
							message: "First Name required",
						},
					]}
				>
					<Input type="text" placeholder="First Name" />
				</Form.Item>
				<Form.Item name="middle_name">
					<Input type="text" placeholder="Middle Name" />
				</Form.Item>
				<Form.Item
					name="last_name"
					rules={[
						{
							required: true,
							message: "Last Name required",
						},
					]}
				>
					<Input type="text" placeholder="Last Name" />
				</Form.Item>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Email required",
						},
						{
							type: "email",
							message: "Invalid email.",
						},
					]}
				>
					<Input type="email" placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="phone"
					rules={[
						{
							required: true,
							message: "Phone required",
						},
					]}
				>
					<MaskedInput
						mask={maskPhone}
						placeholder="Phone"
					></MaskedInput>
				</Form.Item>

				<Form.Item
					name="age"
					rules={[
						{
							required: true,
							message: "Age required",
						},
					]}
				>
					<InputNumber placeholder="Age" min={16} max={65} />
				</Form.Item>
				<Form.Item
					name="postcode"
					rules={[
						{
							required: true,
							message: "Postcode required",
						},
					]}
				>
					<MaskedInput
						mask={maskCode}
						placeholder="Postcode"
					></MaskedInput>
				</Form.Item>

				<Form.Item
					name="Description"
					rules={[
						{
							required: true,
							message: "Description required",
						},
						{
							min: 150,
							message: "Min description: 150 characters",
						},
					]}
				>
					<Input.TextArea placeholder="Description" minLength={150} />
				</Form.Item>
				<Form.Item
					name="t_shirt_size"
					label="T-shirt size"
					rules={[
						{
							required: true,
							message: "T-shirt size required",
						},
					]}
				>
					<Select options={sizes} />
				</Form.Item>
				<Form.Item
					name="t_shirt_color"
					label="T-shirt color"
					rules={[
						{
							required: true,
							message: "Please pick an item!",
						},
					]}
				>
					<Radio.Group defaultValue="white">
						<Radio value="white">White</Radio>
						<Radio value="black">Black</Radio>
						<Radio value="orange">Orange</Radio>
						<Radio value="blue">Blue</Radio>
						<Radio value="red">Red</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name="accept"
					valuePropName="checked"
					rules={[
						{
							validator: (_, value) =>
								value
									? Promise.resolve()
									: Promise.reject(
											new Error(
												"Should accept agreement",
											),
									  ),
						},
					]}
				>
					<Checkbox>
						I have read the <a href="">agreement</a>
					</Checkbox>
                </Form.Item>
                
                <Button type='primary' htmlType='submit'>Validate</Button>
                <Button style={{marginLeft: 8}}onClick={() => {
                    form.resetFields()
                }}>Clear</Button>
			</Form>
		</Card>
	);
};

export default FormValidator;
