import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { setCredentials } from '../../redux/authRedux';
import { useAppDispatch } from '../../redux/hook';

const ThirdLogin = () => {
    const history = useHistory()
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getUser = () => {
          fetch("http://localhost:3001/auth/success", {
            method: "GET",
            credentials: "include",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": "true",
            },
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
            //   dispatch(setCredentials({user:resObject.user,token:resObject.token}))
              //setUser(resObject.user);
              console.log(resObject);
              dispatch(setCredentials({user:resObject.user,token:resObject.token.token}))
              history.push('/')
              //set auth 
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUser();
      }, [])
    return (
        <div>
        </div>
    )
}

export default ThirdLogin
