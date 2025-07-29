'use client';

import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
    {children}
  </Typography>
);

const ListBlock = ({ items }: { items: string[] }) => (
  <List sx={{ pl: 2 }}>
    {items.map((item, index) => (
      <ListItem key={index} disablePadding>
        <ListItemText primary={`• ${item}`} />
      </ListItem>
    ))}
  </List>
);



const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Last Updated: 2025
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to The Capital Academy. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
        </Typography>

        <SectionHeading>1. Information We Collect</SectionHeading>
        <Typography paragraph>
          <strong>Personal Information:</strong> We may collect your name, email, phone number, and other contact details when you interact with our website.
        </Typography>
        <Typography paragraph>
          <strong>Usage Data:</strong> Includes your IP address, browser type, and how you use our site.
        </Typography>

        <SectionHeading>2. Use of Your Information</SectionHeading>
        <Typography paragraph>We use your information to:</Typography>
        <ListBlock
          items={[
            'Provide and maintain our services.',
            'Notify you about changes to our services.',
            'Provide customer support.',
            'Monitor website usage.',
            'Detect, prevent, and resolve technical issues.',
          ]}
        />

        <SectionHeading>3. Data Protection</SectionHeading>
        <Typography paragraph>
          We apply industry-standard security measures to safeguard your personal data from unauthorized access or disclosure.
        </Typography>

        <SectionHeading>4. Sharing Your Information</SectionHeading>
        <Typography paragraph>
          We don’t sell or trade your data. We only share it with trusted third parties who help us operate the website—under confidentiality agreements.
        </Typography>

        <SectionHeading>5. Cookies</SectionHeading>
        <Typography paragraph>
          Our website uses cookies to enhance your experience. You can manage cookie preferences through your browser settings.
        </Typography>

        <SectionHeading>6. Your Rights</SectionHeading>
        <Typography paragraph>You have the right to:</Typography>
        <ListBlock
          items={[
            'Access and update your personal information.',
            'Request deletion of your data.',
            'Object to certain types of data processing.',
          ]}
        />

        <SectionHeading>7. Changes to This Privacy Policy</SectionHeading>
        <Typography paragraph>
          We may update this policy periodically. All changes will be posted on this page.
        </Typography>

        <SectionHeading>8. Contact Us</SectionHeading>
        <Typography paragraph>
          If you have questions about this Privacy Policy, please{' '}
          <MuiLink component={Link} href="/contact" underline="hover" color="primary">
            contact us
          </MuiLink>.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
