# Safari Salesforce Logins

This extension provides Safari users with a simple interface to quickly log in to any of their Salesforce orgs.

## Installing the plugin
1.  Ensure your folder name ends in .safariextension (for example, safarisfdclogins.safariextension). This is required in order to select your project to install.
2.  Enable development mode within Safari (Preferences -> Advanced -> Show Develop menu in menu bar)
3.  Open Safari’s Extension Builder (Develop menu -> Show Extension Builder)
4.  Add the extension folder by clicking the `+` on the bottom left of Extension Builder and select the directory for this repo.
5.  Click the "Add Extension" option and select the folder.
6.  Click `Install` in the top right of Extension Builder. If you do not have a Safari Developer Certificate, please follow the directions in the `Create a Safari Developer Certificate` section below to generate one.
7.  You may need to add the extension’s button to the Safari toolbar (right click/control+click near the back/forward buttons, select `Customize Toolbar` and add the button from there).

## Using the plugin
2.  Click the `Add Login` button.
1.  Click the extension’s toolbar button.  It should have a Salesforce like cloud icon.
3.  Fill in the information.  Group and description are not required.  The username, password, and org type are.
4.  Click the `Save` button.
5.  Click the `Login` button next to your newly added login.

## Just a little more info
What is the `Description` field for when creating a login?  Well, it just so happens that often it is hard to remember which specific org a particular username is associated, especially as the number of sandboxes per production org increases.  The `Description` is then used as a tooltip on the `Login` button.  When the mouse hovers over the `Login` button, the `Description` text is displayed after a short delay.

## Create a Safari Developer Certificate
1.	Sign up for the [Safari Developer Program](https://developer.apple.com/programs/safari/).
2.  Log into the [Apple Developer Center](https://developer.apple.com/devcenter/safari/index.action)
3.  Select the "Safari Extension Certificate Utility" from the right hand list.
![Safari Extension Certificate Utility](/images/SafariExtensionCertificateUtility.png?raw=true)
4.	Ensure that "Safari Extensions" is selected in the top left drop down list.
5.  Click the `+` button in the top right and follow the instructions provided there to generate a new certificate signing request and then the certificate.
![Safari Certificates](/images/SafariCertificates.png?raw=true)