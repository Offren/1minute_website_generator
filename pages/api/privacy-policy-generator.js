export function generatePrivacyPolicy(options) {
  const {
    appName,
    contactEmail,
    policyEffectiveDate,
    appType,
    locationTracked,
    mobileOS,
    ownerType,
    ownerName,
    thirdPartyServices
  } = options;

  return `
# Privacy Policy

**Effective Date: ${policyEffectiveDate}**

${ownerName} ("us", "we", or "our") operates the ${appName} website (the "Service").

This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.

## Information Collection and Use

We collect several different types of information for various purposes to provide and improve our Service to you.

### Types of Data Collected

#### Personal Data

While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:

- Email address
- First name and last name
- Phone number
- Address, State, Province, ZIP/Postal code, City
${locationTracked ? '- Location data' : ''}

#### Usage Data

We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.

## Use of Data

${appName} uses the collected data for various purposes:

- To provide and maintain our Service
- To notify you about changes to our Service
- To allow you to participate in interactive features of our Service when you choose to do so
- To provide customer support
- To gather analysis or valuable information so that we can improve our Service
- To monitor the usage of our Service
- To detect, prevent and address technical issues

## Contact Us

If you have any questions about this Privacy Policy, please contact us at ${contactEmail}.
`;
}