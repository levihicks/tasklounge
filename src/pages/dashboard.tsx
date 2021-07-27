import React, { useContext, useEffect, useState } from 'react';
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
import { userTasksRef } from '../services/firebase';
import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks';
import { removeError, replaceTasks } from '../store/tasksSlice';
import Modal from '../components/UI/Modal';

const StyledDashboard = styled.div`
    margin-left: 30px;
    display: flex;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        flex-direction: column;
        margin: auto;
        margin-top: 70px;
        max-width: 100%;
        padding: 0px 10px;
    }
`;

const DashboardColumn = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 50px;
    display: flex;
    flex-direction: column;

    @media(max-width: ${props => props.theme.mobileBreakpoint}) {
        margin-left: 0px;
    }
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

const StyledModal = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 300px;
    min-height: 300px;
    z-index: 102;
`;

const Dashboard = () => {
    let user = useContext(AuthContext);
    let [userSearching, setUserSearching] = useState(false);
    const dispatch = useAppDispatch();
    const tasksLoading = useAppSelector(state => state.tasks.loading);
    const tasksError = useAppSelector(state => state.tasks.error);
    const tasksInitialized = useAppSelector(state => state.tasks.tasksInitialized);

    useEffect(() => {
        if (user) {
            let listener = userTasksRef(user.uid).on('value', (snapshot) => {
                const data = snapshot.val();
                dispatch(replaceTasks(data));
            });
            return () => {
                if(user)
                userTasksRef(user.uid).off('value', listener);
            }
        }
        else if (user === false) 
            dispatch(replaceTasks({}));
    }, [user, dispatch]);

    return (
        <StyledDashboard>
            { 
                user === null ?
                (
                    <StyledCard>
                        Loading...
                        <Spinner />
                    </StyledCard>
                ) :
                user === false ?
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
            {
                (tasksLoading || !tasksInitialized) && 
                    <StyledModal 
                        backdropStyle={{zIndex: 101}} 
                        hide={() => {}}>
                        <Spinner />Loading...
                    </StyledModal>
            }
            {
                tasksError && 
                    <StyledModal 
                        backdropStyle={{zIndex: 101}} 
                        hide={() => dispatch(removeError())}>
                        An error occurred. Please try again.
                    </StyledModal>
            }
        </StyledDashboard>
    )
};

export default Dashboard;