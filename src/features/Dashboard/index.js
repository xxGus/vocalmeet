import React from "react";

import { Row, Col, Menu, Layout } from "antd";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { history } from "../../utils/history";
import Profile from "../Profile";
import { routes } from "../../routes/routes";
import TodoList from "../TodoList";
import "./styles.css";
import CodeValidator from "../CodeValidator";
import CryptoPrices from "../CryptoPrices";
import FormValidator from "../FormValidator";

const { Header, Sider, Content, Footer } = Layout;

const Dashboard = ({ props }) => {
	let { url } = useRouteMatch();

	return (
		<Layout>
			<Sider>
				<div className="logo" />
				<Menu
					inlineCollapsed={true}
					mode="inline"
					style={{ height: "100%" }}
					defaultSelectedKeys={"1"}
				>
					<Menu.Item
						key="1"
						onClick={() => {
							history.push(`${url}`);
						}}
					>
						Perfil
					</Menu.Item>
					<Menu.Item
						key="2"
						onClick={() => {
							history.push(`${routes.todo_list}`);
						}}
					>
						Todo List
					</Menu.Item>
					<Menu.Item
						key="3"
						onClick={() => {
							history.push(`${routes.code_validator}`);
						}}
					>
						Code Validator
					</Menu.Item>
					<Menu.Item
						key="4"
						onClick={() => {
							history.push(`${routes.crypto_prices}`);
						}}
					>
						Crypto Prices
					</Menu.Item>
					<Menu.Item
						key="5"
						onClick={() => {
							history.push(`${routes.form_validator}`);
						}}
					>
						Form Validator
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Content>
					<Header></Header>
					<Row>
						<Col className="dashboard-content">
							<Switch>
								<Route
									path={`${routes.todo_list}`}
									component={TodoList}
								/>
								<Route path={`${routes.code_validator}`}>
									<CodeValidator />
								</Route>
								<Route path={`${routes.crypto_prices}`}>
									<CryptoPrices />
								</Route>
								<Route path={`${routes.form_validator}`}>
									<FormValidator />
								</Route>
								<Route path={routes.dashboard}>
									<Profile />
								</Route>
							</Switch>
						</Col>
					</Row>
				</Content>
				<Footer></Footer>
			</Layout>
		</Layout>
	);
};

export default Dashboard;
