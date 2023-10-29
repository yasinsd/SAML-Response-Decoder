# SAML Response Decoder Chrome Extension

## Description
SAML Response Decoder is a Chrome extension that allows users to decode and view SAML responses easily. It's a helpful tool for support engineers, developers and administrators working with SAML for authentication and authorization.
It also displays 509 certificate information within the SAML response.  

## Privacy
Your privacy is paramount. All decoding operations are performed locally on your machine; no SAML responses or decoded information are sent to any external servers. The extension’s developers or any third parties do not have access to any data you decode using this extension.

## Features
- Decode Base64 encoded SAML responses
- View user attributes and other information extracted from the SAML response along with the 509 certificate information
- Copy the decoded information to clipboard
- Download the decoded XML

## Installation
1. Download or clone this repository to your local machine.
2. Open Chrome, go to `chrome://extensions/`.
3. Enable `Developer mode` at the top right.
4. Click `Load unpacked` and select the directory of the downloaded extension.

## Usage
1. Click on the extension icon in the Chrome toolbar.
2. Paste your Base64 encoded SAML response into the provided textarea.
3. Click the `Decode` button to view the extracted information.
4. Use the `Copy to Clipboard` button to copy the filtered information, or the `Download Decoded XML` button to download the full decoded pretty XML file.

## Credits
- The [Forge Library](https://github.com/digitalbazaar/forge) by Digital Bazaar, Inc. is utilized for parsing and extracting information from X509 certificates. This library is available under the terms of either the BSD License or the GNU General Public License (GPL) Version 2, with the copyright header maintained as required.

## License
This project is licensed under the MIT License - detailed license information is available upon request or in the project's official documentation.

## Support and Contributions
For support, feature requests, or contributions, please open an issue or pull request on the GitHub repository.

## Disclaimer
Use this extension at your own risk. Always ensure that you are not violating privacy or security policies by decoding and viewing SAML responses.

## Maintainer
This small project is currently maintained by Yasin. For any queries, suggestions, or additional information, feel free to reach out through:
- **Email:** hyphens.grooved-0h@icloud.com
- **GitHub:** [github.com/yasinsd](https://github.com/yasinsd)
