import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import IconAdd from '@material-ui/icons/Add';
import IconHome from '@material-ui/icons/HomeOutlined';
import ShopIcon from '@material-ui/icons/ShoppingCartOutlined';
import BagIcon from '@material-ui/icons/WorkOutlineOutlined';
import CreditCardIcon from '@material-ui/icons/CreditCardOutlined';
import AccountIcon from '@material-ui/icons/AccountBoxOutlined';
import classNames from 'classnames';



import { newOrderPath, ordersPath, paymentLogPath, productsPath, profilePath, statisticPath } from 'config/routes'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
        }
    }
    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
    };
    render(props) {
        const { classes, history } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.toolbar}>
                    <ListItem button
                        selected={this.state.selectedIndex === 0}
                        onClick={event => { this.handleListItemClick(event, 0); history.push(newOrderPath) }}
                        classes={{
                            selected: classes.focus,
                            default: classes.defaultItem,
                            container: classes.listButton
                        }}
                    >
                        <ListItemIcon className={classNames(classes.menuIcon, classes.topIcon)}>
                            <IconAdd fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                color: 'inherit',
                                variant: 'h6',
                                style: { fontWeight: 400 }
                            }}
                            primary='НОВЫЙ ЗАКАЗ'
                        />
                    </ListItem>
                </div>
                <Divider />
                <List>
                    <ListItem button
                        selected={this.state.selectedIndex === 1}
                        onClick={event => {this.handleListItemClick(event, 1); history.push(statisticPath)}}
                        classes={{
                            selected: classes.focus,
                            default: classes.defaultItem
                        }}
                    >
                        <ListItemIcon className={classes.menuIcon}>
                            <IconHome />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                color: 'inherit',
                            }}
                            primary='Статистика'
                        />
                    </ListItem>
                    <ListItem button
                        selected={this.state.selectedIndex === 2}
                        onClick={event => {this.handleListItemClick(event, 2); history.push(productsPath)}}
                        classes={{
                            selected: classes.focus,
                        }}
                    >
                        <ListItemIcon className={classes.menuIcon}>
                            <ShopIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                color: 'inherit',
                            }}
                            primary='Товары'
                        />
                    </ListItem>
                    <ListItem button
                        selected={this.state.selectedIndex === 3}
                        onClick={event => { this.handleListItemClick(event, 3); history.push(ordersPath);}}
                        classes={{
                            selected: classes.focus,
                        }}
                    >
                        <ListItemIcon className={classes.menuIcon}>
                            <BagIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                color: 'inherit',
                            }}
                            primary='Заказы'
                        />
                    </ListItem>
                    <ListItem button
                        selected={this.state.selectedIndex === 4}
                        onClick={event => {this.handleListItemClick(event, 4); history.push(paymentLogPath);}}
                        classes={{
                            selected: classes.focus,
                        }}
                    >
                        <ListItemIcon className={classes.menuIcon}>
                            <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                color: 'inherit',
                            }}
                            primary='Журнал оплат'
                        />
                    </ListItem>
                    <ListItem button
                        selected={this.state.selectedIndex === 5}
                        onClick={event => { this.handleListItemClick(event, 5); history.push(newOrderPath) }}
                        classes={{
                            selected: classes.focus,
                        }}
                    >
                        <ListItemIcon className={classes.menuIcon}>
                            <IconAdd />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                color: 'inherit',
                            }}
                            primary='Новый заказ'
                        />
                    </ListItem>
                    <ListItem button
                        selected={this.state.selectedIndex === 6}
                        onClick={event => { this.handleListItemClick(event, 6); history.push(profilePath) }}
                        classes={{
                            selected: classes.focus,
                        }}
                    >
                        <ListItemIcon className={classes.menuIcon}>
                            <AccountIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{
                                color: 'inherit',
                            }}
                            primary='Мой профиль'
                        />
                    </ListItem>
                </List>
            </div >
        );
    }
}

export default Menu