import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link,useHistory } from 'react-router-dom';


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory()
    const {signin} = useAuth();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
//async function,1st valuate the match in pass and confPass and no continue the signUp, other try to continue and control for an error
    async function handleSubmit(e){
        e.preventDefault()

        
            try{
                setError('')
                //disable the signUp button to avoid multiple account
                setLoading(true)
                await signin(emailRef.current.value, passwordRef.current.value)
                history.push('/')
            }catch {setError('Failed to signIn')}
                setLoading(false)
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef}required/>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef}required/>
                    </Form.Group>
                   
                    <Button disabled = {loading} className='w-100' type='submit'>Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className = 'w-100 text-center mt-2'>Create an account  <Link to='/signup'>SignUp</Link>
        </div> 
            
        </>
    )
}
