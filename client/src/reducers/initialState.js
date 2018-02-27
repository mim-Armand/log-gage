export default {
    stuff: [],
    test: "test",
    handle: "mim_Armand",
    twitter_app:{
        TWITTER_CONSUMER_KEY: null,
        TWITTER_CONSUMER_SECRET: null,
        TWITTER_ACCESS_TOKEN_KEY: null,
        TWITTER_ACCESS_TOKEN_SECRET: null
    },
    fetch_followers_limit: 100,
    fetch_followers_batch: 250,
    fetch_followers_history: [
        {
            start: 0,
            last_fetch: null,
            cursor: "-1"
        }
    ],
    rate_limit_response: {
        resources: {
            followers: {
                "/followers/ids":{}
            }
        }
    },
    verify_credentials_response: {
    }
};