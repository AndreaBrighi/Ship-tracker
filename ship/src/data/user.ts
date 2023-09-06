export interface userData {
    data: user;
    ship: shipData;
}

export interface user {
    username: string;
    token: string;
    userType: string;
}

interface shipData {
    own: boolean;
}