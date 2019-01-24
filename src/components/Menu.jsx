import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import AccountIcon from '@material-ui/icons/AccountBoxOutlined'

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    toolbar: {
        backgroundColor: '#4c6c8b',
        height: 64,
        alignItems: 'middle',
        display: 'flex',
    },
    root: {
        backgroundColor: theme.palette.menuBackground,
        color: theme.palette.getContrastText(theme.palette.menuBackground),
    },
    menuIcon: {
        color: theme.palette.text.secondary,
    }
});

function Menu(props) {
    const { classes, theme } = props;
    return (
        <div className={classes.root}>
            <div className={classes.toolbar}>
                <ListItem button key={0}>
                    <ListItemIcon>
                        <IconAdd fontSize='large' className={classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'inherit',
                            variant: 'h6',
                        }}
                        primary='НОВЫЙ ЗАКАЗ'
                    />
                </ListItem>
            </div>
            <Divider />
            <List>
                <ListItem button >
                    <ListItemIcon>
                        <IconHome className={classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'inherit',
                        }}
                        primary='Статистика'
                    />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <ShopIcon className={classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'inherit',
                        }}
                        primary='Товары'
                    />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <BagIcon className={classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'inherit',
                        }}
                        primary='Заказы'
                    />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <CreditCardIcon className={classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'inherit',
                        }}
                        primary='Журнал оплат'
                    />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <IconAdd className={classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'inherit',
                        }}
                        primary='Новый заказ'
                    />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <AccountIcon className={classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            color: 'inherit',
                        }}
                        primary='Мой профиль'
                    />
                </ListItem>
            </List>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Menu);