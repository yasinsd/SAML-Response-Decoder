## SAML Response Decoder Chrome Extension

### Description
SAML Response Decoder is a Chrome extension that allows users to decode and view SAML responses easily. It's an invaluable tool for support engineers, developers, and administrators working with SAML for authentication and authorization. Additionally, it displays 509 certificate information within the SAML response.
While there are several SAML decoding tools available, the SAML Response Decoder prioritizes user privacy by not automatically detecting SAML responses during login or other operations. Instead, our tool provides a straightforward interface where users can manually paste their SAML responses for decoding. This design choice ensures maximum control for the user and minimizes potential security or privacy concerns.

### Privacy
Your privacy is of utmost importance. All decoding operations are performed locally on your machine; no SAML responses or decoded information are sent to any external servers. Neither the extension’s developers nor any third parties can access the data you decode using this extension.

### Features
- Decode Base64 encoded SAML responses
- View user attributes and other information extracted from the SAML response along with the 509 certificate details
- Copy the decoded information to the clipboard
- Download the decoded XML

### Installation
#### From the Chrome Web Store:
1. Visit the [SAML Response Decoder](https://chrome.google.com/webstore/detail/saml-response-decoder/lgjipdamfgafpllhgpopejiclgkkdakb?hl=en-GB) page on the Chrome Web Store.
2. Click the "Add to Chrome" button.

#### Manual Installation (Alternative):
1. Download or clone this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable `Developer mode` at the top right.
4. Click `Load unpacked` and select the directory of the downloaded extension.

### Usage
1. Click on the extension icon in the Chrome toolbar.
2. Paste your Base64 encoded SAML response into the provided textarea.
3. Press the `Decode` button to view the extracted details.
4. Utilize the `Copy to Clipboard` button to copy the refined information, or the `Download Decoded XML` button to retrieve the full decoded pretty XML file.

### Credits
The Forge Library by Digital Bazaar, Inc. is employed to parse and extract data from X509 certificates. This library is accessible under the terms of either the BSD License or the GNU General Public License (GPL) Version 2, with the copyright header retained as mandated.

### License
This initiative is licensed under the MIT License. Comprehensive license details are available upon inquiry or within the project's official documentation.

### Support and Contributions
For support, feature propositions, or contributions, please initiate an issue or pull request on the GitHub repository.

### Disclaimer
Employ this extension at your discretion. Always ensure compliance with privacy or security policies when decoding and examining SAML responses.

### Maintainer
This modest project is presently overseen by Yasin. For inquiries, suggestions, or further details, don't hesitate to connect:

- Email: hyphens.grooved-0h@icloud.com
- GitHub: [github.com/yasinsd](https://github.com/yasinsd)