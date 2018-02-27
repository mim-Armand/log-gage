# AWS Log-Gage
An standalone, open-source tooling application for AWS Cloud-Watch logs.


<!-- ![Screenshot1](./screenshots/01.png "Twitool screenshot 01") -->



<!-- CircleCI-Build: [![CircleCI](https://circleci.com/gh/mim-Armand/TwiTool.svg?style=svg)](https://circleci.com/gh/mim-Armand/TwiTool) -->

<!-- [![Dependency Status](https://gemnasium.com/badges/github.com/mim-Armand/status.ctl.alexa.skill.svg)](https://gemnasium.com/github.com/mim-Armand/status.ctl.alexa.skill) -->



# To run:
`yarn start`

To run/test in Chrome we need to enable CORS temporarily by running`open -a Google\ Chrome --args --disable-web-security --user-data-dir`

# To build:
`yran build`

# To Release:
#### Locally (Your platform):
`yarn release`
#### Through CI (Multi-platform):
Release candidates should have the combination word `release candidate` in the commit message otherwise the **CI** pipelines will just build the project and run the tests but won't publish the release to GitHub releases as a draft.




## Contribution notes:
 * Please note, if **Travis** failed, first try to purge the cache ( often times it fixes the problem! )





## TODO LIST:
- [ ]  add more stuff to do!