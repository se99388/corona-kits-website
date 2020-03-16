import axios from 'axios';

const instance = axios.create({
    baseURL: '/',
    timeout: 5000,
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
});

const handler = async options => {
    try {
        const result = await instance(options);
        return result.data;
    } catch (ex) {
        console.log('Ofir', ex.message);
        throw ex;
        // log error
    }
};

export const getUsers = () => {
    return handler({
        url: '/api/users'
    });
};

export const getUserById = (id) => {
    return handler({
        url: `/api/users/${id}`,
        method: 'GET'
    });
};
export const getInterests = () => {
    return handler({
        url: '/api/interests'
    });
};

export const addUser = value => {
    return handler({
        url: '/api/users',
        method: 'post',
        data: value
    });
};

export const updateRewardUser = (id, reward) => {
    return handler({
        url: `/api/users/`,
        method: 'PUT',
        data: { id, reward}
    });
};

export const getRewards = () => {
    return handler({
        url: '/api/rewards'
    });
};

export const removeReward = id => {
    return handler({
        url: `/api/rewards/${id}`,
        method: 'DELETE'
        // params:id
    });
};

export const updateReward = reward => {
    return handler({
        url: `/api/rewards/`,
        method: 'PUT',
        data: reward
    });
};

export const addReward = reward => {
    return handler({
        url: `/api/rewards/`,
        method: 'POST',
        data: reward
    });
};

export const getRewardsImages = ()=>{
    return handler({
        method:'GET',
        url:'/api/rewards/rewards-images'
    })
}

export const login = (email, password) => {
    return handler({
        url: '/auth/login',
        method: 'POST',
        data: { email, password }
    });
};

export const logout = ()=>{
    return handler({
        url: 'auth/logout',
        method: 'GET'
    })
}

export const sendEmail = (emailWinMessage)=>{
    return handler({
        url:'api/send-email',
        method:'POST',
        data: emailWinMessage
    })
}


export const addHylabsJobReq = request => {
    return handler({
        url: `/api/hylabs-jobs/`,
        method: 'POST',
        data: request
    });
};
