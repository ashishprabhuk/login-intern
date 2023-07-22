import React from 'react';

const EmployeeDashboard = () => {
	// Access the employee information from the location state
	const employeeInfo = window.location.state || {};
	const {
		employeeId,
		loginTime,
		systemIp,
		systemMac,
		logoutTime,
		isFullDayLeave,
	} = employeeInfo;

	return (
		<div>
			<h1>Welcome to the Employee Dashboard</h1>
			<p>Employee ID: {employeeId}</p>
			<p>Login Time: {loginTime}</p>
			<p>System IP: {systemIp}</p>
			<p>System MAC Address: {systemMac}</p>
			<p>Logout Time: {logoutTime}</p>
			<p>
				Full Day Leave: {isFullDayLeave === '1' ? 'Present' : 'Absent'}
			</p>
			{/* Additional content for the dashboard */}
		</div>
	);
};

export default EmployeeDashboard;
