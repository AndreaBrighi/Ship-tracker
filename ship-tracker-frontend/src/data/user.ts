interface user {
    data: userData;
    ship: shipData
}

interface userData {
    token: string;
    userType: string;
}

interface shipData {
    own: boolean;
}

export default user;