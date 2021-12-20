import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Divider, Row, Tag, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons/lib/icons";
import StateStatus from "../../utils/status";
import { isEmpty } from "../../utils/functions";
import { getProfile, selectProfile } from "./slice";
import WorkXp from "./WorkXp";
import "./styles.css";

const { Title } = Typography;

const Profile = () => {
	const profile = useSelector(selectProfile);
	const dispatch = useDispatch();

	useEffect(() => {
		if (profile.status.getProfile === StateStatus.idle) {
			dispatch(getProfile());
		}
	});

	return (
		<Card>
			{profile.status.getProfile === StateStatus.succeeded &&
			!isEmpty(profile.infos) ? (
				<>
					<Title>{profile.infos.name}</Title>
					<Divider />
					<Title level={2}>Skills</Title>
					<Row>
						{profile.infos.skills.map((el) => (
							<Tag className="profile-tag">{el}</Tag>
						))}
					</Row>
					<Divider />
					<Title level={2}>Competencies</Title>
					<ul className="list-competencies">
						{profile.infos.competencies.map((el) => (
							<li>{el}</li>
						))}
					</ul>
					<Divider />
					<Title level={2}>Work Experience</Title>
					{profile.infos.work_xp.map((el) => (
						<WorkXp work={el} />
					))}
					<Title level={5}>
						<a
							href="https://github.com/xxGus"
							rel="noreferrer"
							target="_blank"
						>
							<GithubOutlined /> GitHub
						</a>
					</Title>
				</>
			) : (
				"loading"
			)}
		</Card>
	);
};

export default Profile;
