interface user {
    data: userData;
    ship: shipData;
}

interface userData {
    username: string;
    token: string;
    userType: string;
}

interface shipData {
    own: boolean;
}

export default user;