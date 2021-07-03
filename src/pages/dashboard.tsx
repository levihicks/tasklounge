import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DashboardGreeting from '../components/DashboardGreeting';
import Search from '../components/Search';
import UserTasks from '../components/UserTasks';
import AccountDropdown from '../components/AccountDropdown';
import TimerNotice from '../components/TimerNotice';
import UpcomingTasks from '../components/UpcomingTasks';
import Card from '../components/UI/Card';
import Spinner from '../components/UI/Spinner';
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

const StyledCard = styled(Card)`
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: bold;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px;
`;

const Dashboard = () => {
    let userSignedIn = useContext(AuthContext);
    let [userSearching, setUserSearching] = useState(false);

    return (
        <StyledDashboard>
            { 
                userSignedIn === null ?
                (
                    <StyledCard>
                        Loading...
                        <Spinner />
                    </StyledCard>
                ) :
                userSignedIn === false ?
                (
                    <StyledCard>
                        <div>
                            <Link to='/sign-in'>Sign in</Link> to view dashboard.
                        </div>
                    </StyledCard>
                ) :
                ( 
                    <><DashboardColumn style={{flexGrow: 2}}>
                        <DashboardGreeting />
                        <Search 
                            searchingState={userSearching} 
                            setSearchingState={setUserSearching} />
                        {!userSearching && <UserTasks />}
                    </DashboardColumn>
                    <DashboardColumn style={{ alignItems: 'flex-end' }}>
                        <AccountDropdown />
                        <TimerNotice />
                        <UpcomingTasks />
                    </DashboardColumn></>
                )
            }
        </StyledDashboard>
    )
};

export default Dashboard;