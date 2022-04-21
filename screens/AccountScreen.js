import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
import Screen from '../components/Screen';
import ListItem from '../components/newListItem';
import Icon from '../components/Icon';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        },
        targetScreen: routes.USER_LISTINGS
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary
        },
        targetScreen: routes.MESSAGES
    }
]

export default function Accountscreen({ navigation }) {
    const { user, logOut } = useAuth();

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem 
                    title={user.firstName + " " + user.lastName}
                    subTitle={user.email}
                    image={user.profilePic}
                />
            </View>
            <View style={styles.container}>
                <FlatList 
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({item}) =>
                        <ListItem 
                            title={item.title}
                            IconComponent = {
                                <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor}/>
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    }
                />
            </View>
            <ListItem 
                title="Log Out"
                IconComponent={
                    <Icon name="logout" backgroundColor="#ffe66d"/>
                }
                onPress={() => logOut()}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    screen: {
        backgroundColor: colors.light
    }
})