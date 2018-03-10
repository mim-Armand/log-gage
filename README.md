# AWS Log-Gage
An standalone, open-source tooling application for AWS Cloud-Watch logs.


<!-- ![Screenshot1](./screenshots/01.png "Twitool screenshot 01") -->



<!-- CircleCI-Build: [![CircleCI](https://circleci.com/gh/mim-Armand/TwiTool.svg?style=svg)](https://circleci.com/gh/mim-Armand/TwiTool) -->

<!-- [![Dependency Status](https://gemnasium.com/badges/github.com/mim-Armand/status.ctl.alexa.skill.svg)](https://gemnasium.com/github.com/mim-Armand/status.ctl.alexa.skill) -->


## Install
NPM package place holder:
`https://www.npmjs.com/package/log-gage`

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
> In travis ci, the GH_TOKEN should be set to the token obtained from github ( so it can push the release draft )

## Mac OSX:

### Code Signing:

#### For distribution outside apple store:

1 . create a *CSR* file ( Keychain Access > Certificate Assistance > Request a ... )
2 . Go to [Apple Developer](https://developer.apple.com/account/mac/certificate/distribution) and create two following certs using the above CSR file ( macOS > Production >> )
    * Developer ID Application ( to sign the app )
    * Developer ID Installer ( to sign the installer )
3. Create a `.p12` file ( Keychain > keys > find the one you want > right click > export ) ( password may be left empty )
4. Base64 encode the file ( `$ base64 ./LoggageCertificates.p12 > ./LoggageCertificates.p12.base64` )
5. set an env var in Travis for `CSC_LINK` = to the above base64 hash.




#### ICON:
Use [IconUtil](https://developer.apple.com/library/content/documentation/GraphicsAnimation/Conceptual/HighResolutionOSX/Optimizing/Optimizing.html) from Apple to make icons for OSX.



## Contribution notes:
 * Please note, if **Travis** failed, first try to purge the cache ( often times it fixes the problem! )





## TODO LIST:
- [ ]  add more stuff to do!
- [ ] ( component LeftDrawer ) >> test if array is empty show a man page and link to AWS docs to create profiles, if only one item ( default ) don't show the drop-down ( just metion default profile in use )
- [ ] Support more ( or all ) regions ( right now, for the sake of time-to-market, `us-east-1` is hard-coded )