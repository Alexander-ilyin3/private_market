import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography, TextField, IconButton } from '@material-ui/core';
import DataTable from "mui-datatables";
import SearchIcon from '@material-ui/icons/Search';

class Products extends Component {

    state = {

    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;

        return (
            <Paper>
                <div className={classes.Bar}>
                    <Typography variant='h5'>
                        СПИСОК ТОВАРОВ
                    </Typography>
                    <div className={classes.rightmenuElements}>
                        <div className={classes.searchBar}>
                            <TextField
                                variant='outlined'
                                className={classes.input}
                                placeholder="Искать здесь"
                                label='Искать...'
                            />
                            <IconButton className={classes.iconButton} aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                        >
                            Создать закакз
                        </Button>
                    </div>
                </div>
                <DataTable
                    
                />
            </Paper>
        );
    }

}

export default Products;