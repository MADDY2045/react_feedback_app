import React from 'react';
import Card from '../shared/Card';
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <Card>
        <div className="about">
            <h1>About this Project</h1>
            <p>This is a React project to leave a feedback for service</p>
            <p>Version 1.0.0</p>
            <p>
            <Link to='/'>
                BACK TO HOME
            </Link>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage