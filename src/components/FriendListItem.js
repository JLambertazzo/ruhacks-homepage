import React from 'react';
import styled from 'styled-components';
import Studdy from '../assets/images/people.svg';
import Chat from '../assets/images/chat.svg';

const SidebarDropdown = styled.li`
  display: flex;

  > img {
    margin-right: 10px;
  }
`;

const FriendListItem = ({ friend, isOnline }) => {

  const renderOnlineFeatures = () => {

    if (isOnline) {
      return (
        <>
          <img src={Studdy} alt="Studdy" />
          <img src={Chat} alt="Chat" />
        </>
      )
    }

    return null;
  }

  return (
    <SidebarDropdown className="sidebar-dropdown">
      <a href="#"><span>{friend}</span></a>
      {renderOnlineFeatures()}
    </SidebarDropdown>
  )
};

export default FriendListItem;