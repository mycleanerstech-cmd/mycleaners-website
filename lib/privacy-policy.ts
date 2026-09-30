import { LEGAL_NAME } from "@/lib/constants";

export type PrivacyTocItem = {
  number: number;
  title: string;
  href: `#${string}`;
};

export type PrivacySubsection = {
  id: string;
  label: string;
  blocks: ReadonlyArray<
    | { type: "p"; text: string }
    | { type: "bullets"; items: ReadonlyArray<string> }
    | { type: "callout"; title: string; text: string }
  >;
};

export type PrivacySectionData = {
  id: string;
  number: number;
  title: string;
  intro?: string;
  subsections?: ReadonlyArray<PrivacySubsection>;
  blocks?: ReadonlyArray<{ type: "p"; text: string } | { type: "bullets"; items: ReadonlyArray<string> }>;
};

export const PRIVACY_EFFECTIVE_DATE = "July 15, 2020" as const;

export const PRIVACY_TOC: readonly PrivacyTocItem[] = [
  { number: 1, title: "Information we collect", href: "#information" },
  { number: 2, title: "How We Use Your Information", href: "#howweuse" },
  { number: 3, title: "Information We Share", href: "#informationweshare" },
  { number: 4, title: "Your Choices and Opt-Outs", href: "#choices" },
  { number: 5, title: "Third-Party Content, Links, and Plug-Ins", href: "#thirdparty" },
  { number: 6, title: "Public Forums", href: "#forums" },
  { number: 7, title: "Children’s Privacy", href: "#children" },
  { number: 8, title: "Data Security", href: "#security" },
  { number: 9, title: "Revisions to this Privacy Policy", href: "#revisions" },
  { number: 10, title: "How to Contact Us", href: "#contact" },
] as const;

export const PRIVACY_SECTIONS: readonly PrivacySectionData[] = [
  {
    id: "information",
    number: 1,
    title: "Information we collect",
    subsections: [
      {
        id: "information-you-provide",
        label: "1.1 Information You Provide",
        blocks: [
          {
            type: "p",
            text: "Mycleaners collects information from you when you choose to share it with us. This may include when you use our Services, register or create an online account with or through the Services, make a purchase, request information from us, sign up for newsletters, text messages, or our email list, use our cleaning and related services, enter into sweepstakes or other promotion, fill out a survey, request customer support, or otherwise communicate with or contact us. The may include your name, email address, password, telephone or mobile number, address (for pickup and delivery), zip code, and photo.",
          },
          {
            type: "p",
            text: "You may also provide us with certain information in connection with specification transactions:",
          },
          {
            type: "callout",
            title: "Information About Your Clothing.",
            text: "We may also collect information on the clothes you are giving us for cleaning, including type, service requested, brand, color, size, and photos. We do this to provide you with an enhanced experience when using the Service, such as sending an itemized list of items we picked up for cleaning, and providing you with customized offers or promotions based on the information we collect about your clothing.",
          },
          {
            type: "callout",
            title: "Referring a Friend.",
            text: "If you choose to refer a friend through the Services, we will ask for your friend's contact information. We will a message to your friend inviting him or her to sign-up for Mycleaners's service or visit the Site or App. We store this information to send the referral message(s) and track the success of our referral program.",
          },
          {
            type: "callout",
            title: "Information You Provide Through Social Media.",
            text: "You may also be given the option to link to your Facebook or other social media account through the Services. When you do, we may automatically receive certain information about you based on your registration and privacy settings on those third party services.",
          },
        ],
      },
      {
        id: "information-automatically-collected",
        label: "1.2 Information Automatically Collected",
        blocks: [
          {
            type: "p",
            text: "Whenever you visit or interact with the Services, Mycleaners, as well as any third-party advertisers and/or service providers, may use a variety of technologies that automatically or passively collect information about your online activity. This information may be collected in the following ways:",
          },
          {
            type: "callout",
            title: "Usage Information:",
            text: "We may use a variety of technologies such as cookies, web beacons, pixel tags, log files, local shared objects (Flash cookies), HTML5 cookies, or other technologies to collect certain information about visitors to, and users of, our Services and interactions with our emails and online and mobile advertisements, and to allow Mycleaners to keep track of analytics and certain statistical information. This includes, but is not limited to, your browser type, device type, operating system, software version, the domain name from which you accessed the Services, the date and time you visit the Services, the areas or pages of the Services that you visit, the amount of time you spend viewing or using the Services, the number of times you return to the Services, other click-stream or site usage data, emails that you open, forward or click-through to our Services, and other sites that you may visit.",
          },
          {
            type: "callout",
            title: "Device Information:",
            text: "We may automatically collect your IP address or other unique identifier (“Device Identifier”) for the computer, mobile device, tablet or other device (collectively, “Device”) you use to access the Services, including the hardware model and mobile network information. We may use a Device Identifier to, among other things, provide the Services, help diagnose problems with our servers, analyze trends, track users’ web page, email and mobile application movements/activities, help identify or gather broad demographic information for aggregate use, and retarget online and mobile advertisements to you across computers or devices you may use.",
          },
          {
            type: "callout",
            title: "Geolocation Information:",
            text: "If you choose to turn on your Bluetooth, Wi-Fi or other geolocation functionality when you use our App, we may collect and use your geolocation information so that you are able to view when our drivers are close to your location, set your pick up location if you are at a different address then you have saved in your account, and allow our drivers to find the location you wish your clothes to be picked up from.",
          },
          {
            type: "callout",
            title: "Third Party Service Providers.",
            text: "We may use third party service providers to support our Site or App. Some of these service providers may use technology such as cookies, web beacons, pixel tags, log files, Flash cookies, or HTML5 cookies to receive, collect, and store information.",
          },
          {
            type: "callout",
            title: "Third Party Analytic Technologies.",
            text: "We may use third parties’ analytics and tracking tools to better understand who is using the Services, how people are using the Services, how to improve the effectiveness of the Services and related content, and to help us or those third parties serve more targeted advertising to you across the Internet. These tools may use technology such as cookies, web beacons, pixel tags, log files, Flash cookies, HTML5 cookies, or other technologies to automatically collect and store certain information. They may also combine information they collect from your interaction with the Site or App with information they collect from other sources. We do not have access to, or control over, these third parties’ use of cookies or other tracking technologies.",
          },
        ],
      },
      {
        id: "information-from-other-sources",
        label: "1.3 Information Collected From Other Sources",
        blocks: [
          {
            type: "p",
            text: "We may acquire information from other trusted sources to update or supplement the information that you provide or that we collect automatically (such as information to validate or update your address or other demographic and lifestyle information). We may use this information to help us maintain the accuracy of the , to target our communications so that we can inform you of products, services or other offers that may be of interest to you, and for internal business analysis or other business purposes.",
          },
        ],
      },
      {
        id: "combination-of-information",
        label: "1.4 Combination of Information",
        blocks: [
          {
            type: "p",
            text: "We may combine the information we receive from and about you, including information you provide to us and information we automatically collect through the Services, as well as information collected offline, across other computers or devices that you may use, and from third party sources.",
          },
        ],
      },
    ],
  },
  {
    id: "howweuse",
    number: 2,
    title: "HOW WE USE YOUR INFORMATION",
    blocks: [
      { type: "p", text: "Mycleaners may use the from and about you for the following reasons:" },
      {
        type: "bullets",
        items: [
          "To respond to your requests for cleaning and related services (including to validate, confirm, verify, pickup, fulfill, and deliver your order), and contact and communicate with you when necessary (including providing service-related announcements);",
          "To enhance your online shopping experience, including as a way to recognize you and welcome you to the Services, and allow you to view your order history;",
          "To review the usage and operations of our Services, develop new products or services, and conduct analysis to enhance or improve our content, products, and services;",
          "To provide you with customized Site or App content, targeted offers, and advertising on the Site or App, via email, text message or push notification, or across other websites, mobile applications, social media or online services;",
          "To contact you with information, newsletters and promotional materials from Mycleaners or on behalf of our partners and affiliates;",
          "To use your data in an aggregated non-specific format for analytical and demographic purposes;",
          "To protect the security or integrity of the Services and our business, such as by protecting against and preventing fraud, unauthorized transactions, claims and other liabilities, and managing risk exposure, including by identifying potential hackers and other unauthorized users;",
          "To use and disclose your credit/debit card information only to process payments and prevent fraud; and",
          "For other purposes disclosed at the time you provide your information or otherwise with your consent.",
        ],
      },
    ],
  },
  {
    id: "informationweshare",
    number: 3,
    title: "INFORMATION WE SHARE",
    blocks: [
      {
        type: "p",
        text: "We do not sell, share, rent or trade your personal information or geo-location information other than as disclosed within this Privacy Policy. We may share the from and about you in the following ways:",
      },
      {
        type: "bullets",
        items: [
          "Affiliates: We may share your information with Mycleaners affiliates and subsidiaries for business, operational, promotional and marketing purposes.",
          "Service Providers: We may share your information with third party service providers that provide business, professional or technical support functions for us (including to the extent necessary or desirable to pick up or deliver your order or complete your transaction), help us operate our business and the Services, or administer activities on our behalf.",
          "Sweepstakes, Contests, and Promotions. If you choose to enter into one of our sweepstakes, contests, or other promotions (a “Promotion”) we may disclose your information to third parties or the public in connection with the administration of such Promotion, as required by law, as otherwise permitted by the Promotion’s official rules, or otherwise in accordance with the terms of this Privacy Policy.",
          "Business Partners or Other Trusted Entities: We may share your information with our select business partners, affiliates, and other trusted entities for the purpose of providing you with information on goods or services we believe will be of interest to you. You may, at any time, opt out of receiving such communications by contacting those third parties directly.",
          "Legal Matters; Safety: We may access and disclose your information to respond to subpoenas, judicial processes, or government requests and investigations, or in connection with an investigation on matters related to public safety, as permitted by law, or otherwise as required by law. We may disclose your information to protect the security of our Services, servers, network systems, and databases. We also may disclose your information as necessary, if we believe that there has been a violation of our Terms of Use, any other legal document or contract related to our services, or the rights of any third party.",
          "Sale or Transfer of Business or Assets: We may sell or purchase assets during the normal course of our business. If another entity acquires us or any of our assets, information we have collected about you may be transferred to such entity. In addition, if any bankruptcy or reorganization proceeding is brought by or against us, such information may be considered an asset of ours and may be sold or transferred to third parties. Should such a sale or transfer occur, we will use reasonable efforts to try to require that the transferee use personal information provided through the Services in a manner that is consistent with this Privacy Policy.",
          "Aggregate or Anonymous Non-Personal Information: We may also share aggregate, anonymous, or de-identified non-personal information with third parties for their marketing or analytics uses.",
          "Other: We also may share your information as disclosed to you at the time of collection, or otherwise with your consent.",
        ],
      },
    ],
  },
  {
    id: "choices",
    number: 4,
    title: "YOUR CHOICES AND OPT-OUTS",
    blocks: [
      { type: "p", text: "Cookies, Tracking Options and California Do Not Track Disclosures" },
      {
        type: "p",
        text: "Certain parts of our Site and App require cookies. You are free to set your browser or operating system settings to limit certain tracking or to decline cookies, but by doing so, you may not be able to use certain features on the Services or take full advantage of all of our offerings. Please refer to your Web browser’s or operating system’s website or “Help” section for more information on how to delete and/or disable your browser or operating system from receiving cookies or controlling your tracking preferences.",
      },
      {
        type: "p",
        text: "Our system may not respond to Do Not Track requests or headers from some or all browsers. We may use cookies or other technologies to deliver more relevant advertising and to link data collected across other computers or devices that you may use. To understand your choices for receiving more relevant advertising or to manage your settings, please review the information below:",
      },
      {
        type: "bullets",
        items: [
          "To learn more about the use of cookies or other technologies to deliver more relevant advertising and to know your choices with respect to collection and use of the data by these third party tools.",
          "If you wish to prevent your data from being used by Google Analytics, Google has developed the Google Analytics opt-out browser add-on available here.",
          "On your mobile device, you may also adjust your privacy and advertising settings to control whether you want to receive more relevant advertising.",
        ],
      },
      { type: "p", text: "Opt Out Preferences" },
      {
        type: "p",
        text: "We provide our customers with the opportunity to opt-out of having their information used for purposes not directly related to placement, processing, fulfillment, or delivery of a product or service. To opt-out of marketing communications, you may use one of these convenient methods:",
      },
      {
        type: "bullets",
        items: [
          "Electronic Promotional Offers. If you do not want to receive emails from us regarding special promotions or offers, you may click the unsubscribe link in the footer of any email, or contact us at support@mycleaners.in with “Unsubscribe Promotional Offers” in the subject line.",
          "Mobile Promotional Offers. When you provide us with your mobile number for marketing purposes, we may send you certain marketing alerts via text message. Standard data and message rates will apply. If you no longer wish to receive mobile alerts from us, you can follow the instructions provided in those messages or otherwise reply “STOP” to any Mycleaners alert.",
        ],
      },
      {
        type: "p",
        text: "Your instructions to limit the use of your information for these purposes will be processed as soon as reasonably practicable. Additionally, we are not responsible for informing third parties (including without limitation our third party service providers or partners) with whom we have already shared your personal information of any changes requested pursuant to this section, or for removing information from or causing information to be removed from the databases or records of such entities",
      },
      { type: "p", text: "Access to Your Information" },
      {
        type: "p",
        text: "You may log in to your account page on the Site or App to update your profile, payment information, and preferences, or otherwise email us at support@mycleaners.in. If you choose to deactivate your account, we may still retain certain information for analytical purposes and recordkeeping integrity, as well as to prevent fraud, resolve disputes, enforce our Terms of Use or other policies, take actions we deem necessary due to technical and legal requirements, and as dictated by constraints related to the security, integrity and operation of our Services.",
      },
    ],
  },
  {
    id: "thirdparty",
    number: 5,
    title: "THIRD-PARTY CONTENT, LINKS, AND PLUG-INS",
    blocks: [
      {
        type: "p",
        text: "The Services may have links to third-party websites, which may have privacy policies that differ from our own. We are not responsible for the practices of such sites.",
      },
      {
        type: "p",
        text: "The Services may also offer you the ability to interact with social plugins from social media sites, which may allow us and/or the social media site to receive data from or about you. In some cases, we may know that you clicked on a social plugin, such as a Twitter Follow button, or receive other information from the social media sites. Similarly, if you have previously provided personal information to a third-party operating a plug-in on the Services, then such third-party may recognize you on the Services. Your use of social network plugins is subject to each social media site’s privacy policy, which may be different from ours, so please read these policies carefully to understand their policies and your options. As with linked sites, we have no control over the information that is collected, stored, or used by social network plugins, and are not responsible for the practices of such sites.",
      },
    ],
  },
  {
    id: "forums",
    number: 6,
    title: "PUBLIC FORUMS",
    blocks: [
      {
        type: "p",
        text: "Any information you may disclose on our Services, in blogs, on message boards, in chat rooms, or on other public areas on the Services or other third-party websites that the Services may link to, becomes public information. Please exercise caution when disclosing personal information in these public areas.",
      },
    ],
  },
  {
    id: "children",
    number: 7,
    title: "CHILDREN’S PRIVACY",
    blocks: [
      {
        type: "p",
        text: "Protecting children’s privacy is important to us. We do not direct the Services to, nor do we knowingly collect any personal information from, children under the age of 18. If Mycleaners learns that a child under the age of eighteen has provided personally identifiable information to the Services, it will use reasonable efforts to remove such information from its files.",
      },
    ],
  },
  {
    id: "security",
    number: 8,
    title: "DATA SECURITY",
    blocks: [
      {
        type: "p",
        text: "We have taken certain physical, administrative, and technical steps to safeguard the from and about our customers and visitors and users of our Services. While we make every effort to help ensure the integrity and security of our network and systems, we cannot guarantee our security measures. When you enter sensitive information (such as debit/credit card information) on our forms, we encrypt the transmission of that information using secure socket layer technology (SSL).",
      },
    ],
  },
  {
    id: "revisions",
    number: 9,
    title: "REVISIONS TO THIS PRIVACY POLICY",
    blocks: [
      {
        type: "p",
        text: "We reserve the right, at our sole discretion, to change, modify, add, remove, or otherwise revise portions of this Privacy Policy at any time. When we do, we will post the change(s) on the Services. Your continued use of the Services following the posting of changes to these terms means you accept these changes. If we change the Privacy Policy in a material way, we will provide appropriate notice to you.",
      },
    ],
  },
  {
    id: "contact",
    number: 10,
    title: "HOW TO CONTACT US",
    blocks: [
      {
        type: "p",
        text: "If you have any questions or concerns about this Privacy Policy or the practices described herein, you may contact us at support@mycleaners.in or via customer support helpline.",
      },
      { type: "p", text: LEGAL_NAME },
    ],
  },
] as const;

