// Maintainer Information:
// Name: Yasin
// Email: hyphens.grooved-0h@icloud.com
// GitHub: https://github.com/yasinsd

document.addEventListener('DOMContentLoaded', function() {
    const decodeBtn = document.getElementById('decode');
    const downloadBtn = document.getElementById('download');
    const copyBtn = document.getElementById('copy');
    const output = document.getElementById('output');
    const samlResponseInput = document.getElementById('saml-response');
    const base64DecodeBtn = document.getElementById('base64-decode');

    base64DecodeBtn.addEventListener('click', function() {
        try {
            const encodedInput = samlResponseInput.value.trim();
            if (!encodedInput) {
                output.textContent = 'Error: Please enter a valid base64 encoded string.';
                return;
            }

            const decodedInput = atob(encodedInput);
            output.textContent = decodedInput;
            downloadBtn.style.display = 'none';  // Hiding button as they are specific to SAML decoding
            copyBtn.style.display = 'block';
        } catch (error) {
            output.textContent = 'Error: Unable to decode the base64 string. Ensure it is valid base64 encoded data.';
        }
    });

    function formatXml(xml) {
        var formatted = '';
        var reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        var pad = 0;
        xml.split('\r\n').forEach((node) => {
            var indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
                indent = 1;
            }
            var padding = '';
            for (var i = 0; i < pad; i++) {
                padding += '  ';
            }
            formatted += padding + node + '\r\n';
            pad += indent;
        });
        return formatted;
    }

    decodeBtn.addEventListener('click', function() {
        try {
            const encodedSAMLResponse = samlResponseInput.value.trim();
            if (!encodedSAMLResponse) {
                output.textContent = 'Dude, come on. Please enter a valid SAML response.';
                return;
            }

            const decodedSAMLResponse = atob(encodedSAMLResponse);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(decodedSAMLResponse, "text/xml");

            let info = "Extracted Information:\n";

            const signatureElement = xmlDoc.getElementsByTagName("ds:Signature")[0];
            info += `SAML Response Signed: ${signatureElement ? 'Yes' : 'No'}\n`;

            // Extract user attributes with namespace
            const attributes = xmlDoc.querySelectorAll('AttributeStatement Attribute');
            let attributesInfo = 'User Attributes:\n';
            attributes.forEach(attr => {
                const attrName = attr.getAttribute('Name');
                const attrValues = attr.querySelectorAll('AttributeValue');
                attrValues.forEach(value => {
                    attributesInfo += `${attrName}: ${value.textContent.trim()}\n`;
                });
            });
            info += attributesInfo;

            // Extract subject
            const nameID = xmlDoc.querySelector('NameID');
            if(nameID) {
                info += `Subject: ${nameID.textContent}\n`;
            }

            // Extract conditions
            const conditions = xmlDoc.querySelector('Conditions');
            if(conditions) {
                info += `Not Before: ${conditions.getAttribute('NotBefore')}\n`;
                info += `Not On Or After: ${conditions.getAttribute('NotOnOrAfter')}\n`;

                const audienceRestriction = conditions.querySelector('AudienceRestriction Audience');
                if(audienceRestriction) {
                    info += `Audience Restriction: ${audienceRestriction.textContent}\n`;
                }
            }

            // Check for 509 certificate
            const x509cert = xmlDoc.querySelector('X509Certificate');
            if(x509cert) {
                info += `\n509 Certificate: Yes\n`;
                const pem = `-----BEGIN CERTIFICATE-----\n${x509cert.textContent.trim()}\n-----END CERTIFICATE-----`;
                const forge = window.forge;
                const cert = forge.pki.certificateFromPem(pem);

                // Function to safely extract field values
                const getFieldValue = (object, field) => {
                    const fieldValue = object.getField(field);
                    return fieldValue ? fieldValue.value : 'Not Available';
                };

                // Extracting various certificate information
                info += `Common Name: ${getFieldValue(cert.subject, 'CN')}\n`;
                info += `Organization: ${getFieldValue(cert.subject, 'O')}\n`;
                info += `Organizational Unit: ${getFieldValue(cert.subject, 'OU')}\n`;
                info += `Country: ${getFieldValue(cert.subject, 'C')}\n`;
                
                info += `Issuer Common Name: ${getFieldValue(cert.issuer, 'CN')}\n`;
                info += `Issuer Organization: ${getFieldValue(cert.issuer, 'O')}\n`;
                info += `Issuer Organizational Unit: ${getFieldValue(cert.issuer, 'OU')}\n`;
                info += `Issuer Country: ${getFieldValue(cert.issuer, 'C')}\n`;

                info += `Serial Number: ${cert.serialNumber ? cert.serialNumber : 'Not Available'}\n`;
                info += `Valid From: ${cert.validity.notBefore ? cert.validity.notBefore : 'Not Available'}\n`;
                info += `Valid To: ${cert.validity.notAfter ? cert.validity.notAfter : 'Not Available'}\n`;

                const publicKey = forge.pki.publicKeyToPem(cert.publicKey).split('\n').slice(1, -2).join('');
                //info += `Public Key: ${publicKey}\n`;

                // // Extracting Extensions Information
                // if (cert.extensions) {
                //     info += 'Extensions:\n';
                //     cert.extensions.forEach(extension => {
                //         info += `  ${extension.name}: ${extension.value || 'Not Available'}\n`;
                //     });
                // }
                
            } else {
                info += `509 Certificate: No\n`;
            }

            output.textContent = info;
            downloadBtn.style.display = 'block';
            copyBtn.style.display = 'block';
        } catch (error) {
            output.textContent = 'Error: Unable to decode the SAML response. Ensure it is a valid Base64 encoded XML.';
        }
    });

    copyBtn.addEventListener('click', function() {
        const textArea = document.createElement("textarea");
        textArea.value = output.textContent; 
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Information copied to clipboard!');  // Optional: I thought a confirmation would be nice. But can be removed if annoying. 
    });



    downloadBtn.addEventListener('click', () => {
        try {
            const encodedSAMLResponse = samlResponseInput.value.trim();
            const decodedSAMLResponse = atob(encodedSAMLResponse);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(decodedSAMLResponse, "text/xml");
            const prettyXml = formatXml(new XMLSerializer().serializeToString(xmlDoc.documentElement));

            const blob = new Blob([prettyXml], {type: 'text/xml'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'decodedSAML.xml';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            output.textContent = 'Error: Unable to prepare the decoded XML for download.';
        }
    });
});
