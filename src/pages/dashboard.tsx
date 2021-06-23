import React from 'react';
import styled from 'styled-components';
import DashboardGreeting from '../components/DashboardGreeting';
import Searchbox from '../components/Searchbox';
import UserTasks from '../components/UserTasks';
// import AccountDropdown from '../components/AccountDropdown';
import TimerNotice from '../components/TimerNotice';
import UpcomingTasks from '../components/UpcomingTasks';
// import { AuthContext } from '../contexts/AuthContext';

const StyledDashboard = styled.div`
    margin-left: 30px;
    display: flex;
`;

const DashboardColumn = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
`;

const Dashboard = () => {
    // let userSignedIn = useContext(AuthContext);

    return (
        <StyledDashboard>
            <DashboardColumn style={{flexGrow: 2}}>
                <DashboardGreeting />
                <Searchbox />
                <UserTasks />
            </DashboardColumn>
            <DashboardColumn style={{ alignItems: 'flex-end' }}>
                {/* userSignedIn && <AccountDropdown /> */}
                <TimerNotice />
                <UpcomingTasks />
            </DashboardColumn>
        </StyledDashboard>
    )
};

export default Dashboard;