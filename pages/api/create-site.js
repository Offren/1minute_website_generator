import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { generatePrivacyPolicy } from './privacy-policy-generator';
import { generateTermsAndConditions } from './terms-conditions-generator';

export default async function handler(req, res) {
  const { websiteName, customDomain, colorScheme, description, industry, artStyle, email } = req.body;
  const githubToken = process.env.GITHUB_TOKEN;
  const repoName = `${websiteName.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().slice(0, 8)}`;

  if (!githubToken) {
    return res.status(500).json({ message: 'GitHub token not configured' });
  }

  const headers = {
    Authorization: `token ${githubToken}`,
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    // Create repository
    await axios.post('https://api.github.com/user/repos', {
      name: repoName,
      private: false,
      auto_init: true
    }, { headers });

    // Generate Privacy Policy
    const privacyPolicy = generatePrivacyPolicy({
      appName: websiteName,
      contactEmail: email,
      policyEffectiveDate: new Date().toISOString().split('T')[0],
      appType: 'Commercial',
      locationTracked: true,
      mobileOS: 'Android, iOS & KaiOS',
      ownerType: 'Company',
      ownerName: websiteName,
      thirdPartyServices: []
    });

    // Add Privacy Policy to the repository
    await axios.put(`https://api.github.com/repos/${repoName}/contents/content/privacy-policy.md`, {
      message: 'Add Privacy Policy',
      content: Buffer.from(privacyPolicy).toString('base64')
    }, { headers });

    // Generate Terms & Conditions
    const termsAndConditions = generateTermsAndConditions({
      websiteName: websiteName,
      websiteUrl: customDomain ? `https://${customDomain}` : `https://${repoName}.github.io`
    });

    // Add Terms & Conditions to the repository
    await axios.put(`https://api.github.com/repos/${repoName}/contents/content/terms-and-conditions.md`, {
      message: 'Add Terms and Conditions',
      content: Buffer.from(termsAndConditions).toString('base64')
    }, { headers });

    // Update homepage content
    const homepageContent = `
---
title: "Welcome to ${websiteName}"
date: ${new Date().toISOString()}
draft: false
---

${description}

{{< figure src="/images/image1.jpg" alt="Main Image" >}}

## Gallery

{{< gallery >}}
{{< figure src="/images/image1.jpg" alt="Image 1" >}}
{{< figure src="/images/image2.jpg" alt="Image 2" >}}
{{< figure src="/images/image3.jpg" alt="Image 3" >}}
{{< /gallery >}}

[Privacy Policy](/privacy-policy)
[Terms and Conditions](/terms-and-conditions)
    `;
    await axios.put(`https://api.github.com/repos/${repoName}/contents/content/_index.md`, {
      message: 'Update homepage content',
      content: Buffer.from(homepageContent).toString('base64')
    }, { headers });

    // Add other necessary files and configurations...

    res.status(200).json({
      message: 'Website created successfully',
      repoUrl: `https://github.com/${repoName}`,
      websiteUrl: customDomain ? `https://${customDomain}` : `https://${repoName}.github.io`,
      dnsInstructions: customDomain ? `Please add a CNAME record for ${customDomain} pointing to ${repoName}.github.io` : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating website', error: error.message });
  }
}