# Newsletter Setup Guide

## Option 1: Buttondown (Recommended - Free & Easy)

### Step 1: Create Buttondown Account
1. Go to [buttondown.email](https://buttondown.email)
2. Sign up for a free account
3. Choose your username (e.g., `akshat-blog`)

### Step 2: Configure RSS-to-Email
1. In Buttondown dashboard, go to **Settings** → **Emails**
2. Find **RSS feed** section
3. Add your blog's RSS feed URL: `https://your-domain.com/rss.xml`
4. Enable **Automatically send new posts**
5. Buttondown will now automatically email subscribers when you publish new posts!

### Step 3: Update Newsletter Component
1. Open `src/components/Newsletter.astro`
2. Replace `YOUR_USERNAME` in the form action with your Buttondown username:
   ```html
   action="https://buttondown.email/api/emails/embed-subscribe/akshat-blog"
   ```

### Step 4: Customize Email Template (Optional)
- In Buttondown dashboard, customize the email design
- Add your branding, colors, and footer

### Features You Get:
✅ **Email validation** - Built-in by Buttondown
✅ **Double opt-in** - Confirms subscriber email
✅ **Automatic blog emails** - Sends new posts via RSS
✅ **Unsubscribe links** - Automatic in every email
✅ **Analytics** - Track open rates, clicks
✅ **Free tier** - Up to 1,000 subscribers

---

## Option 2: Mailchimp

### Step 1: Create Mailchimp Account
1. Go to [mailchimp.com](https://mailchimp.com)
2. Sign up for free account (up to 500 subscribers)

### Step 2: Create Audience
1. Create a new audience (your subscriber list)
2. Set up double opt-in for validation

### Step 3: Set Up RSS Campaign
1. Go to **Campaigns** → **Create Campaign** → **RSS**
2. Add your RSS feed: `https://your-domain.com/rss.xml`
3. Set frequency (e.g., daily check for new posts)
4. Design your email template

### Step 4: Get Embed Form Code
1. Go to **Audience** → **Signup forms** → **Embedded forms**
2. Copy the form HTML
3. Replace the form in `src/components/Newsletter.astro` with Mailchimp's code

---

## Option 3: ConvertKit

### Step 1: Create ConvertKit Account
1. Go to [convertkit.com](https://convertkit.com)
2. Sign up (free up to 1,000 subscribers)

### Step 2: Create Form
1. Create a new form in ConvertKit
2. Customize the design

### Step 3: Set Up RSS Automation
1. Go to **Automations** → **New Automation**
2. Choose **RSS** trigger
3. Add your RSS feed URL
4. Set up email to send when new post detected

### Step 4: Embed Form
1. Get the form embed code
2. Replace form in `src/components/Newsletter.astro`

---

## Testing Your Newsletter

1. Subscribe with your own email
2. Publish a test blog post
3. Check if you receive the email (may take a few minutes)
4. Verify unsubscribe link works

---

## Current Implementation

The newsletter component is already added to your homepage (`src/pages/index.astro`).

**Location:** Below the recent posts, above the RSS link

**Features:**
- Responsive design (mobile-friendly)
- Email validation (required field)
- Clean, modern styling
- Matches your site's design

---

## Next Steps

1. Choose a service (Buttondown recommended)
2. Create account
3. Update `YOUR_USERNAME` in `Newsletter.astro`
4. Configure RSS-to-email automation
5. Test with your email
6. Start collecting subscribers!

---

## Pro Tips

- **Add newsletter link to nav**: Consider adding a `/newsletter` page explaining benefits
- **Promote in posts**: Add CTA at end of blog posts
- **Welcome email**: Set up automated welcome email for new subscribers
- **Archive**: Create public archive of past newsletters
