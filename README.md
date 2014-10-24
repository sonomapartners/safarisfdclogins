# Safari Salesforce Logins

This extension provides Safari users with a simple interface to quickly log in to any of their Salesforce orgs.

## Installing the plugin
1.  Enable development mode within Safari (Preferences -> Advanced -> Show Develop menu in menu bar)
2.  Open Safari’s Extension Builder (Develop menu -> Show Extension Builder)
3.  Add the extension folder by clicking the `+` on the bottom left of Extension Builder and select the directory for this repo.
4.  Click `Install` in the top right of Extension Builder.
5.  You may need to add the extension’s button to the Safari toolbar (right click/control+click near the back/forward buttons, select `Customize Toolbar` and add the button from there).

## Using the plugin
1.  Click the extension’s toolbar button.  It should have a Salesforce like cloud icon.
2.  Click the `Add Login` button.
3.  Fill in the information.  Group and description are not required.  The username, password, and org type are.
4.  Click the `Save` button.
5.  Click the `Login` button next to your newly added login.

## Just a little more info
What is the `Description` field for when creating a login?  Well, it just so happens that often it is hard to remember which specific org a particular username is associated, especially as the number of sandboxes per production org increases.  The `Description` is then used as a tooltip on the `Login` button.  When the mouse hovers over the `Login` button, the `Description` text is displayed after a short delay.
