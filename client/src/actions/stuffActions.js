import * as types from './actionTypes';
import crypto from 'crypto-js';
import axios from 'axios';
import OAuth from 'oauth-1.0a';

function url() {
    return 'www.url.com';
}

function getOAuth(d, url){
    var oauth = OAuth({
        consumer: {
            key: d.TWITTER_CONSUMER_KEY, //'<consumer key>',
            secret: d.TWITTER_CONSUMER_SECRET//'<consumer secret>'
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function(base_string, key) {
            return crypto.enc.Base64.stringify(crypto.HmacSHA1(base_string, key));
        }
    });
    var token = {
        key: d.TWITTER_ACCESS_TOKEN_KEY,
        secret: d.TWITTER_ACCESS_TOKEN_SECRET
    };
    return oauth.toHeader(oauth.authorize({url, method: 'GET'}, token));
}

export function receiveStuff(json) {
    console.log('Actions ', json)
    return {type: types.RECEIVE_STUFF, test: json};
    // return {type: types.RECEIVE_STUFF, stuff: json.stuff};
}

export function fetchStuff() {
    return dispatch => {
        return fetch(url(), {
            method: 'GET',
            // mode: 'cors',
            credentials: 'include',
            headers: {
                'x-api-key': '',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveStuff(json)));
    };
}

export function updateStatePartial(data) {
    return {type: types.UPDATE_STUFF_STATE, payload: data}
}

export function testTwitterApp(d){
    return (dispatch, getState, { OAuth }) => {

        dispatch(updateStatePartial({isLoading: true}));
        // dispatch(updateStatePartial({handle: d.TWITTER_HANDLE})); // we update the handle already as this is not a part of credentials that needs to be tested before being added to the persisted state
        const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
        return axios(url, { headers: getOAuth(d, url),  json: true })
            .then( (response) => {
                console.log('Received data from TWITTER!',response.data);
                dispatch(updateStatePartial({isLoading: false}));
                dispatch(updateStatePartial({twitter_app: d}));
                dispatch(updateStatePartial({handle_id: response.data.id}));
                dispatch(updateStatePartial({
                    verify_credentials_response: {
                        ...response.data,
                        ...{timestamp: Date.now()}
                    }
                }));
                dispatch(updateStatePartial({verify_credentials_time: Date.now()}));
                //TODO: show success notification
            })
            .catch(function (error) {
                dispatch(updateStatePartial({isLoading: false}));
                //TODO: show an error message
                console.error(error);
            });
    }
}

export function checkRateLimits(d){
    return (dispatch, getState) => {
        dispatch( updateStatePartial( {isLoading: true} ));
        const url = 'https://api.twitter.com/1.1/application/rate_limit_status.json';
        return axios(url, { headers: getOAuth(d, url), json: true})
            .then( (response) => {
                console.log('Rate Limits:',response.data);
                dispatch(updateStatePartial({
                    rate_limit_response: {
                        ...response.data,
                        ...{timestamp: Date.now()}
                    }
                }));
                //TODO: show success notification
                dispatch(updateStatePartial({isLoading: false}));
            })
            .catch(function (error) {
                //TODO: show an error message
                console.error("THE RATE LIMIT REQUEST FAILED!!!", error);
                // dispatch(updateStatePartial({isLoading: false}));
            });
    }
}

export function getFollowers(d, cursor, count){
    let El_Store = window.El_Store;
    return ( dispatch, getState ) => {
        dispatch ( updateStatePartial( {isLoading: true } ))

        let fh_ = getState().stuff.fetch_followers_history.slice();
        let cfh_ = fh_.pop(); // current batch
        let sofar_ = cfh_.sofar || 0;
        console.log('fh_ > ', fh_, 'cfh_ > ', cfh_)
        const url = `https://api.twitter.com/1.1/followers/ids.json?cursor=${ cursor || cfh_.cursor }&screen_name=mim_Armand&count=${ count || getState().stuff.fetch_followers_batch}`;
        return axios(url, { headers: getOAuth(d, url), json: true})
            .then( (response) => {
                console.log('Followers', fh_.length, cfh_.sofar, response.data);
                let el_store;
                 if (typeof El_Store !== 'undefined') el_store = new El_Store({cwd: 'followers', name: fh_.length});
                 el_store.set(`ids`, response.data.ids , el_store);
                 // el_store.set(`ids.timeStamp`, Date.now() , el_store);
                 el_store.set(`${cfh_.sofar}.timeStamp`, Date.now() , el_store);
                 console.log(el_store.get(`${cfh_.sofar}`), el_store);
                //TODO: persist data on disk ( + some data - like the number of followers, etc. - on the state )
                cfh_.cursor = response.data.next_cursor_str;
                cfh_.last_fetch = Date.now();
                cfh_.sofar = sofar_ + (response.data.ids.length);
                fh_.push(cfh_);
                dispatch(updateStatePartial({
                    fetch_followers_history: fh_
                }));
            })
            .catch(function (error) { console.error(error); }); //TODO: show an error message

        dispatch(updateStatePartial({isLoading: false}));
    }
}

export function getFollowersCycle(){
    return (dispatch, getState ) =>{

        // THE FOLLOWING IS JUST FOR DEVELOPMENT TO RESET PARTS OF THE STATE SO WE CAN RETRY!
        // dispatch(updateStatePartial({
        //     fetch_followers_history: [{
        //         start: Date.now(),
        //         last_fetch: null,
        //         cursor: "-1"
        //     }],
        //     fetch_followers_batch: 250
        // }));

        console.info('getFollowersCycle...');
        // * check for twitter app creds and that they verify
        console.info('checking for twitter app creds and that they verify..')
        let t_ = getState().stuff.twitter_app;
        if (t_.TWITTER_CONSUMER_KEY && t_.TWITTER_CONSUMER_SECRET && t_.TWITTER_ACCESS_TOKEN_KEY && t_.TWITTER_ACCESS_TOKEN_SECRET){
            return dispatch( testTwitterApp(t_)).then( ()=>{
                console.info(" ---> If credentials were validated, start an interval to check the limits and get the followers");
                if(getState().stuff.verify_credentials_response.timestamp < Date.now() + 999 ){ // the creds were added recently (probably by the dispatch above^^^) and are OK (they wouldn't be persisted otherwise)!
                    console.info("Now starting an interval and checking for rate limits...");
                    // TODO start the interval and distill the following to it's own action ( so we can use it with dispatch from the interval )
                    return dispatch( checkRateLimits(t_))
                        .then ( ()=>{
                        // if( getState().stuff.rate_limit_response.timestamp > Date.now() + 999 ){
                        // }
                        var remains_ = getState().stuff.rate_limit_response.resources.followers["/followers/ids"]["remaining"];
                        console.info(`Currently remaining rate limit is: `, remains_);
                        if ( remains_ > 8){ // <<TODO! this is just to limit the number of reqs so we don't have to wait 15 each time, but for prod can be set to 0
                            console.info(`Now getting the next 5K follower IDs..`);
                            return dispatch( getFollowers(t_))
                                .then( ()=>{
                                let fh_ = getState().stuff.fetch_followers_history.slice();
                                let crsr_ = fh_[ fh_.length - 1 ].cursor; // next cursor
                                    console.log(" _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ cursor: ", crsr_);
                                    let addInterval = 15000; // TODO: this could/should be set to 0 for maximum speed!
                                    if( crsr_ == 0 ){ // it was the last batch so we have to start over after a while!
                                        console.log(" WE NEED TO START A NEW BATCH! ");
                                        dispatch(updateStatePartial({
                                            fetch_followers_history: [...fh_, {
                                                start: Date.now(),
                                                last_fetch: null,
                                                sofar: 0,
                                                cursor: "-1"
                                            }]
                                        }));
                                        setTimeout(()=>{
                                            return dispatch( getFollowersCycle() );
                                        }, 99999 + addInterval)
                                    }else{ // wasn't the last batch so we need to get the next one with a tiny wait time for aestetics!
                                        setTimeout(()=>{
                                            return dispatch( getFollowersCycle() );
                                        }, 9999 + addInterval) //TODO: this timeout should be a lot less, some like 99 or som'n!
                                    }

                            //     // 1. Get the next cursur ( -1 if starts )
                            //     // 2. Make the call
                            //     // 3. persist:
                            //     //    - Follower IDs
                            //     //    - Next cursur
                            //     //    - TimeStamp
                            //     // 4. If cursor==0, that's the last record so we start a new batch and add an starting point to the fetch_followers_history
                            //
                            });
                        }else{
                            let reset = new Date(0).setUTCSeconds( getState().stuff.rate_limit_response.resources.followers["/followers/ids"].reset ) - Date.now();
                            console.info( "RATE LIMIT IS REACHED!!!", `Reset in ${( reset  ) / 1000 / 60} minutes!` );
                            setTimeout(()=>{
                                console.log("THE CALLBACK IS FIRED NOW!");
                                return dispatch( getFollowersCycle() );
                            }, reset)
                        }
                    })
                }
            })
        }
        // * start an interval for:
        //    1 check the rate limits
        //    2 if rate limit is not hit --> make the call to get followers, otherwise nothing..
        //    3 we need to keep the current cursur in the state as we may have to make many calls to get all the followers ( as we know )
    }
}
