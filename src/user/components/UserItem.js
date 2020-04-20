import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={'/'}>
          <div className="user-item__info">
            <h2>{props.id} - {props.name}</h2>
            <span>{props.email}</span>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
