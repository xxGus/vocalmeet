import { Col, Typography } from "antd";
import React from "react";
import "./styles.css";

const { Title } = Typography;

const WorkXp = ({ work }) => {
	return (
		<Col className="work-xp">
			<Title level={3} className="title-work">
				{work.title}
			</Title>
			<Title level={4} className="subtitle-work">
				{work.subtitle}
			</Title>
			<p className="duration-location-work">
				<span>{work.date}</span>
				<span>{work.location}</span>
			</p>
			<p className="abstract-work">{work.abstract}</p>
			<Title className="subtitle-work" level={4}>
				Description
			</Title>
			<p className="description-work">{work.description}</p>
		</Col>
	);
};

export default WorkXp;
