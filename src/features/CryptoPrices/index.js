import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Typography, Table, Form, Row, Select } from "antd";
import { categoriesList, coinsList, selectCrypto } from "./slice";
import StateStatus from "../../utils/status";
import { formatCurrency } from "../../utils/functions";

const { Title } = Typography;
const { Option } = Select;

const currencies = [
	{ label: "US Dollar", value: "usd" },
	{ label: "Euro", value: "eur" },
	{ label: "Russian Ruble", value: "rub" },
	{ label: "Indonisian Rupiah", value: "idr" },
	{ label: "South Korean Won", value: "krw" },
	{ label: "Chinese Yuan", value: "cny" },
	{ label: "New Taiwan Dollar", value: "twd" },
	{ label: "Japanese Yen", value: "jpy" },
	{ label: "Brazil Real", value: "brl" },
];

const CryptoPrices = () => {
	const crypto = useSelector(selectCrypto);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [category, setCategory] = useState("");
	const [currency, setCurrency] = useState("usd");
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Price",
			dataIndex: "current_price",
			render: (price) => {
				if (price < 999) {
					return `${currency.toUpperCase()} $${price.toFixed(2)}`
				}
				return `${formatCurrency(price, currency.toUpperCase())}`

			}
		},
		{
			title: "1h",
			dataIndex: "price_change_percentage_1h_in_currency",
			render: (value) => {
				if (value < 0) {
					return <p style={{ color: "red" }}> {value.toFixed(2)}%</p>;
				}
				return <p style={{ color: "green" }}>{value !== null ? value.toFixed(2) : 0.0}%</p>;
			},
		},
		{
			title: "24h",
			dataIndex: "price_change_percentage_24h_in_currency",
			render: (value) => {
				if (value < 0) {
					return <p style={{ color: "red" }}> {value.toFixed(2)}%</p>;
				}
				return <p style={{ color: "green" }}>{value !== null ? value.toFixed(2) : 0.0}%</p>;
			},
		},
		{
			title: "7d",
			dataIndex: "price_change_percentage_7d_in_currency",
			render: (value) => {
				if (value < 0) {
					return <p style={{ color: "red" }}> {value.toFixed(2)}%</p>;
				}
				return <p style={{ color: "green" }}>{value !== null ? value.toFixed(2) : 0.0}%</p>;
			},
		},
		{
			title: "24h Volume",
			dataIndex: "total_volume",
			render: (vol) => `${formatCurrency(vol, currency.toUpperCase())}`,
		},
		{
			title: "Mkt Cap",
			dataIndex: "market_cap",
			render: (mkt) => `${formatCurrency(mkt, currency.toUpperCase())}`,
		},
	];

	useEffect(() => {
		if (crypto.status.coinsList === StateStatus.idle) {
			dispatch(
				coinsList({
					page: page,
					category: category,
					vs_currency: currency,
				}),
			);
		}

		if (crypto.status.categoriesList === StateStatus.idle) {
			dispatch(categoriesList());
		}
	});

	const onChangeCategory = (value) => {
		setCategory(value);
		setPage(1);
		dispatch(
			coinsList({
				page: page,
				category: value,
				vs_currency: currency,
			}),
		);
	};

	const onChangeCurrency = (value) => {
		setCurrency(value);
		setPage(1);
		dispatch(
			coinsList({
				page: page,
				category: category,
				vs_currency: value,
			}),
		);
	};

	return (
		<Card>
			<Title>Crypto Prices</Title>
			<Row style={{ marginBottom: 8 }}>
				<Select
					style={{ width: 200, marginRight: 8 }}
					options={currencies}
					onChange={onChangeCurrency}
					defaultValue={currency}
				/>
				<Select
					showSearch
					style={{ width: 200 }}
					options={crypto.categories}
					onChange={onChangeCategory}
				/>
			</Row>
			<Table
				columns={columns}
				loading={crypto.status.coinsList === StateStatus.loading}
				dataSource={crypto.list}
				pagination={{
					pageSize: 100,
					current: page,
					total: 11800,
					showSizeChanger: false,
				}}
				onChange={(pagination) => {
					console.log(pagination);
					setPage(pagination.current);
					let params = {
						page: pagination.current,
						vs_currency: currency,
						category: category,
					};

					dispatch(coinsList(params));
				}}
			/>
			:
		</Card>
	);
};

export default CryptoPrices;
