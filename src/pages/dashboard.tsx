import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DashboardGreeting from '../components/DashboardGreeting';
import Searchbox from '../components/Searchbox';
import UserTasks from '../components/UserTasks';
import AccountDropdown from '../components/AccountDropdown';
import TimerNotice from '../components/TimerNotice';
import UpcomingTasks from '../components/UpcomingTasks';
import Card from '../components/UI/Card';
import { AuthContext } from '../contexts/AuthContext';

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

const SignInRequiredText = styled.div`
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: bold;
`;

const StyledCard = styled(Card)`
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px;
`;

const Dashboard = () => {
    let userSignedIn = useContext(AuthContext);

    return (
        <StyledDashboard>
            { 
            userSignedIn ?
            ( 
                <><DashboardColumn style={{flexGrow: 2}}>
                    <DashboardGreeting />
                    <Searchbox />
                    <UserTasks />
                </DashboardColumn>
                <DashboardColumn style={{ alignItems: 'flex-end' }}>
                    <AccountDropdown />
                    <TimerNotice />
                    <UpcomingTasks />
                </DashboardColumn></>
            ) :
            (
                <StyledCard>
                    <SignInRequiredText>
                        <Link to='/sign-in'>Sign in</Link> to view dashboard.
                    </SignInRequiredText>
                </StyledCard>
            )
            }
        </StyledDashboard>
    )
};

export default Dashboard;