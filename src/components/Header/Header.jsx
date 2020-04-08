import React from 'react'
import BugReportIcon from '@material-ui/icons/BugReport';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const Header = () => {
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <BugReportIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Corona Virus Tracker
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header
