import React from "react";
import { HashRouter as Router} from "react-router-dom";
import { routes } from "./routes/routes";
import Dashboard from "./features/Dashboard";

import "./App.css";

const App = () => {
	return (
		<Router basename={`${routes.dashboard}`} hashType="slash">
			<Dashboard />
		</Router>
	);
};

export default App;
