export function generateTermsAndConditions(options) {
  const { websiteName, websiteUrl } = options;

  return `
# Terms and Conditions

Last updated: ${new Date().toDateString()}

Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the ${websiteUrl} website (the "Service") operated by ${websiteName} ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.

By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.

## Content

Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.

## Links To Other Web Sites

Our Service may contain links to third-party web sites or services that are not owned or controlled by ${websiteName}.

${websiteName} has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that ${websiteName} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.

## Changes

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

## Contact Us

If you have any questions about these Terms, please contact us at [Your Contact Information].
  `;
}