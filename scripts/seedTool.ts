import mongoose from 'mongoose';
import { Tool } from '../models/Tool';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toolverse';

const toolsData = [
  // ==================== FINANCE TOOLS (5) ====================
  {
    name: 'EMI Calculator',
    slug: 'emi-calculator',
    category: 'Finance',
    description: 'Calculate Equated Monthly Installments (EMI) for home, car, or personal loans instantly.',
    seoTitle: 'Free EMI Calculator - Calculate Loan EMIs Online',
    seoDescription: 'Estimate your monthly loan EMIs, interest rates, and loan tenure breakdown effortlessly.',
    componentKey: 'emi-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Enter the principal loan amount.',
      'Specify the annual interest rate percentage.',
      'Select the loan tenure in years or months.',
      'Review your calculated monthly EMI and total interest payable.'
    ],
    benefits: [
      'Accurate monthly budget planning',
      'Instant breakdown of principal vs interest',
      '100% free with client-side computation'
    ],
    faqs: [
      { question: 'What is an EMI?', answer: 'EMI stands for Equated Monthly Installment, which is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.' },
      { question: 'Is this EMI calculator free to use?', answer: 'Yes, this calculator is completely free with unlimited usage.' }
    ]
  },
  {
    name: 'SIP Calculator',
    slug: 'sip-calculator',
    category: 'Finance',
    description: 'Calculate future wealth growth and total returns from your Systematic Investment Plans (SIP).',
    seoTitle: 'Free SIP Calculator - Calculate Investment Growth',
    seoDescription: 'Estimate your mutual fund SIP returns and wealth creation over time.',
    componentKey: 'sip-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Enter your monthly SIP investment amount.',
      'Specify the expected annual return rate (%).',
      'Choose the total investment tenure in years.',
      'View your projected total wealth and total profit earnings.'
    ],
    benefits: [
      'Visualize compounding growth',
      'Helps set long-term financial goals',
      'Real-time investment projections'
    ],
    faqs: [
      { question: 'What is a SIP?', answer: 'A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds allowing investors to invest small amounts periodically.' },
      { question: 'How is SIP return calculated?', answer: 'SIP returns are calculated using compounding interest based on monthly installment frequency.' }
    ]
  },
  {
    name: 'GST Calculator',
    slug: 'gst-calculator',
    category: 'Finance',
    description: 'Calculate Net and Gross prices by adding or removing Goods and Services Tax (GST).',
    seoTitle: 'Free GST Calculator - Add or Remove GST Rates',
    seoDescription: 'Quickly calculate inclusive and exclusive GST amounts for products and services.',
    componentKey: 'gst-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Enter the initial product cost.',
      'Select the applicable GST slab percentage (5%, 12%, 18%, 28%).',
      'Choose whether to Add GST (exclusive) or Remove GST (inclusive).',
      'View the total GST tax amount and final price.'
    ],
    benefits: [
      'Supports standard tax slabs',
      'Calculates both inclusive and exclusive tax values',
      'Fast invoicing and price estimates'
    ],
    faqs: [
      { question: 'What is GST?', answer: 'GST (Goods and Services Tax) is an indirect tax levied on the supply of goods and services.' },
      { question: 'Can I remove GST from a total price?', answer: 'Yes, select the Remove GST option to compute the net cost before tax.' }
    ]
  },
  {
    name: 'FD Calculator',
    slug: 'fd-calculator',
    category: 'Finance',
    description: 'Calculate maturity values and interest earned on Fixed Deposits across bank tenure options.',
    seoTitle: 'Free Fixed Deposit (FD) Calculator - Maturity Interest',
    seoDescription: 'Calculate maturity payouts and total interest yields for fixed deposit savings.',
    componentKey: 'fd-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Enter your deposit principal amount.',
      'Specify the annual interest rate provided by your bank.',
      'Select the deposit tenure duration.',
      'Check your maturity value and accrued interest.'
    ],
    benefits: [
      'Compare bank deposit rates',
      'Accurate compound interest forecasting',
      'Instant financial return figures'
    ],
    faqs: [
      { question: 'What is a Fixed Deposit?', answer: 'A Fixed Deposit is a financial instrument provided by banks which provides investors a higher rate of interest than a regular savings account.' }
    ]
  },
  {
    name: 'Loan Calculator',
    slug: 'loan-calculator',
    category: 'Finance',
    description: 'Analyze loan amortization, total interest cost, and monthly payment schedules.',
    seoTitle: 'Free Loan Amortization Calculator - Financial Planning',
    seoDescription: 'Plan personal, business, or auto loans with clear repayment schedules.',
    componentKey: 'loan-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Input the total loan principal.',
      'Set the annual interest percentage.',
      'Set the loan duration in months or years.',
      'Review total repayment figures and interest costs.'
    ],
    benefits: [
      'Helps compare loan offers',
      'Highlights total borrowing overhead',
      'Zero sign-up required'
    ],
    faqs: [
      { question: 'How can I lower my total loan interest?', answer: 'You can lower total interest by paying a higher down payment or choosing a shorter tenure.' }
    ]
  },

  // ==================== UTILITY TOOLS (5) ====================
  {
    name: 'Age Calculator',
    slug: 'age-calculator',
    category: 'Utility',
    description: 'Find your exact age metrics in years, months, weeks, and days based on your birth date.',
    seoTitle: 'Free Online Age Calculator - Exact Date of Birth Metrics',
    seoDescription: 'Calculate exact age in years, months, and days effortlessly.',
    componentKey: 'age-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Select your Date of Birth.',
      'Select the target calculation date (defaults to today).',
      'Click calculate to inspect exact age metrics.'
    ],
    benefits: [
      'Provides age breakdown down to days',
      'Useful for official documentation',
      '100% accurate calendar handling'
    ],
    faqs: [
      { question: 'Does it account for leap years?', answer: 'Yes, the calculation handles leap years automatically.' }
    ]
  },
  {
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'Utility',
    description: 'Solve percentage increases, decreases, relative variations, and values instantly.',
    seoTitle: 'Free Percentage Calculator - Quick Percent Math',
    seoDescription: 'Calculate relative percent changes, percentage of amounts, and fractional values.',
    componentKey: 'percentage-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Select the percentage operation type.',
      'Enter the numerical inputs.',
      'View the calculated percentage outcome immediately.'
    ],
    benefits: [
      'Multiple percentage formula modes',
      'Saves time on school or business math',
      'Simple clean UI'
    ],
    faqs: [
      { question: 'How do I calculate a percentage increase?', answer: 'Subtract the old value from the new value, divide by the old value, and multiply by 100.' }
    ]
  },
  {
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    category: 'Utility',
    description: 'Calculate final markdown prices, total money saved, and net cost during sales.',
    seoTitle: 'Free Discount Calculator - Calculate Sale Savings',
    seoDescription: 'Find net final prices and exact savings when applying discount percentages.',
    componentKey: 'discount-calculator',
    toolType: 'hardcoded',
    howToUse: [
      'Enter the item original sticker price.',
      'Input the discount percentage off.',
      'Review your net cost and total cash saved.'
    ],
    benefits: [
      'Great for shopping sales',
      'Prevents checkout math mistakes',
      'Instant result calculation'
    ],
    faqs: [
      { question: 'Can I apply stacked discounts?', answer: 'Enter the combined percentage discount to get the final price.' }
    ]
  },
  {
    name: 'QR Code Generator',
    slug: 'qr-generator',
    category: 'Utility',
    description: 'Convert web links, text blocks, or contact info into downloadable QR Code images.',
    seoTitle: 'Free QR Code Generator - Create Downloadable QR Codes',
    seoDescription: 'Generate custom vector QR codes for websites, text, or URLs instantly.',
    componentKey: 'qr-generator',
    toolType: 'hardcoded',
    howToUse: [
      'Type or paste your target URL or text.',
      'Customize visual styling parameters.',
      'Click Generate and download your PNG QR graphic.'
    ],
    benefits: [
      'High-resolution downloadable codes',
      'Compatible with all smartphones',
      'No registration barriers'
    ],
    faqs: [
      { question: 'Do generated QR codes expire?', answer: 'No, static QR codes never expire as they encode raw text directly.' }
    ]
  },
  {
    name: 'Password Generator',
    slug: 'password-generator',
    category: 'Utility',
    description: 'Generate robust, secure random passwords matching custom length and symbol rules.',
    seoTitle: 'Free Strong Password Generator - Secure Random Strings',
    seoDescription: 'Create strong, unhackable random passwords with custom symbols and numbers.',
    componentKey: 'password-generator',
    toolType: 'hardcoded',
    howToUse: [
      'Select your desired password length.',
      'Toggle uppercase, lowercase, numbers, and special symbols.',
      'Click Generate and copy your secure password.'
    ],
    benefits: [
      'High-entropy cryptographic security',
      'Generated locally in your browser memory',
      'Protects against dictionary attacks'
    ],
    faqs: [
      { question: 'Are generated passwords saved on server logs?', answer: 'No, all password generation occurs strictly inside browser memory.' }
    ]
  },

  // ==================== DEVELOPER TOOLS (5) ====================
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    category: 'Developer',
    description: 'Beautify, parse, validate, and minify raw JSON payloads online.',
    seoTitle: 'Free JSON Formatter & Validator - Beautify JSON',
    seoDescription: 'Format, validate, prettify, or compress JSON data structures instantly.',
    componentKey: 'json-formatter',
    toolType: 'hardcoded',
    howToUse: [
      'Paste your raw JSON string into the workspace input.',
      'Click Format to beautify or Minify to compress.',
      'Review syntax validation error messages if present.'
    ],
    benefits: [
      'Instant syntax validation alerts',
      'Supports tree formatting and stringifying',
      'Fast browser execution'
    ],
    faqs: [
      { question: 'What is JSON?', answer: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format.' }
    ]
  },
  {
    name: 'Base64 Encoder/Decoder',
    slug: 'base64-converter',
    category: 'Developer',
    description: 'Safely encode ASCII strings into Base64 formats or decode Base64 strings back to plain text.',
    seoTitle: 'Free Base64 Encode & Decode Tool - Convert Strings Online',
    seoDescription: 'Convert plain text to Base64 strings or decode Base64 back to text instantly.',
    componentKey: 'base64-converter',
    toolType: 'hardcoded',
    howToUse: [
      'Choose between Base64 Encode or Decode modes.',
      'Enter your raw string input.',
      'Copy the resulting encoded or decoded string output.'
    ],
    benefits: [
      'Supports UTF-8 string inputs',
      'Essential tool for API developer workflows',
      'Local execution safeguards'
    ],
    faqs: [
      { question: 'Is Base64 an encryption method?', answer: 'No, Base64 is an encoding scheme, not encryption or hashing.' }
    ]
  },
  {
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    category: 'Developer',
    description: 'Decode JSON Web Token (JWT) header and payload objects securely in real time.',
    seoTitle: 'Free JWT Decoder Tool - Inspect Token Headers & Payloads',
    seoDescription: 'Parse and inspect JSON Web Token claims, expirations, and header parameters.',
    componentKey: 'jwt-decoder',
    toolType: 'hardcoded',
    howToUse: [
      'Paste your encoded JSON Web Token (JWT).',
      'Inspect the decoded Header, Payload, and Signature parameters.',
      'Check token issue and expiration timestamps.'
    ],
    benefits: [
      'Inspect authentication payloads without sending data to servers',
      'Formatted colorized output',
      'Decodes claim expirations'
    ],
    faqs: [
      { question: 'Is my secret key transmitted across servers?', answer: 'No, token parsing runs completely client-side in browser JS.' }
    ]
  },
  {
    name: 'UUID Generator',
    slug: 'uuid-generator',
    category: 'Developer',
    description: 'Bulk generate production-ready Version 4 Universally Unique Identifiers (UUIDs).',
    seoTitle: 'Free UUID / GUID Generator - Bulk v4 Identifiers',
    seoDescription: 'Generate random Version-4 UUIDs / GUIDs for database keys and system development.',
    componentKey: 'uuid-generator',
    toolType: 'hardcoded',
    howToUse: [
      'Choose the number of UUIDs required.',
      'Click Generate to create random v4 UUID strings.',
      'Copy generated identifiers directly to clipboard.'
    ],
    benefits: [
      'RFC 4122 compliant v4 UUIDs',
      'Bulk generation up to 100 identifiers',
      'Instant one-click copy'
    ],
    faqs: [
      { question: 'What is a v4 UUID?', answer: 'A Version 4 UUID is a randomly generated 128-bit identifier used to identify database records.' }
    ]
  },
  {
    name: 'Regex Tester',
    slug: 'regex-tester',
    category: 'Developer',
    description: 'Test Regular Expressions dynamically against test string inputs with match highlights.',
    seoTitle: 'Free Regex Tester & Debugger - Test Regular Expressions',
    seoDescription: 'Test, debug, and validate RegEx patterns against text arrays in real time.',
    componentKey: 'regex-tester',
    toolType: 'hardcoded',
    howToUse: [
      'Enter your RegEx expression pattern.',
      'Input the test string array.',
      'Review real-time match highlighting and capture groups.'
    ],
    benefits: [
      'Supports standard global/multiline flags',
      'Instant visual regex validation',
      'Client-side performance'
    ],
    faqs: [
      { question: 'What is RegEx?', answer: 'RegEx (Regular Expression) is a sequence of characters that forms a search pattern used for string matching.' }
    ]
  },

  // ==================== TEXT TOOLS (5) ====================
  {
    name: 'Word Counter',
    slug: 'word-counter',
    category: 'Text',
    description: 'Count words, characters, sentences, paragraphs, and estimated reading time.',
    seoTitle: 'Free Word Counter Tool - Count Words & Characters',
    seoDescription: 'Analyze character count, word density, and paragraph statistics online.',
    componentKey: 'word-counter',
    toolType: 'hardcoded',
    howToUse: [
      'Paste your draft content into the text workspace.',
      'Inspect total word, character, sentence, and paragraph counts.',
      'Check reading time estimations.'
    ],
    benefits: [
      'Essential for SEO writers and students',
      'Identifies character boundaries',
      'Real-time updates'
    ],
    faqs: [
      { question: 'Does it count spaces as characters?', answer: 'The tool provides counts both with and without physical space characters.' }
    ]
  },
  {
    name: 'Character Counter',
    slug: 'character-counter',
    category: 'Text',
    description: 'Review symbol and physical character spaces with strict limit boundaries for social media.',
    seoTitle: 'Free Character Counter - Check Letter & Symbol Limits',
    seoDescription: 'Monitor exact letter counts for meta tags, tweets, and social media post limits.',
    componentKey: 'character-counter',
    toolType: 'hardcoded',
    howToUse: [
      'Paste or type text into the workspace.',
      'Monitor character counts with and without spaces.',
      'Ensure content fits within target character constraints.'
    ],
    benefits: [
      'Ensures SEO title tags stay under 60 characters',
      'Prevents social media text truncation',
      'Instant statistics'
    ],
    faqs: [
      { question: 'What is the ideal meta description character count?', answer: 'Ideal meta descriptions should stay between 140 and 160 characters.' }
    ]
  },
  {
    name: 'Case Converter',
    slug: 'case-converter',
    category: 'Text',
    description: 'Convert text strings through UPPERCASE, lowercase, Title Case, and Sentence case.',
    seoTitle: 'Free Text Case Converter - Uppercase, Lowercase, Title Case',
    seoDescription: 'Convert text strings to UPPERCASE, lowercase, Title Case, or Capitalized text.',
    componentKey: 'case-converter',
    toolType: 'hardcoded',
    howToUse: [
      'Paste raw text into the input field.',
      'Click the target case button (e.g., UPPERCASE, Title Case).',
      'Copy your converted text.'
    ],
    benefits: [
      'Fixes capitalization errors in seconds',
      'Supports Title and Sentence Case formats',
      'One-click copy function'
    ],
    faqs: [
      { question: 'What is Title Case?', answer: 'Title Case capitalizes the first letter of every major word in a sentence.' }
    ]
  },
  {
    name: 'Text Reverser',
    slug: 'text-reverser',
    category: 'Text',
    description: 'Reverse letters, words, or full paragraph sequences chronologically backwards.',
    seoTitle: 'Free Text Reverser - Reverse Characters or Words Online',
    seoDescription: 'Mirror text arrays, flip words, or reverse character order instantly.',
    componentKey: 'text-reverser',
    toolType: 'hardcoded',
    howToUse: [
      'Enter your string input into the box.',
      'Choose whether to reverse characters or reverse entire word order.',
      'Copy the inverted string output.'
    ],
    benefits: [
      'Fun utility for encoding puzzle text',
      'Instant character ordering inversions',
      'Client-side rendering'
    ],
    faqs: [
      { question: 'Can I reverse word order without flipping characters?', answer: 'Yes, choose Reverse Words to keep individual letter spelling intact.' }
    ]
  },
  {
    name: 'Slug Generator',
    slug: 'slug-generator',
    category: 'Text',
    description: 'Format raw titles and headlines cleanly into semantic, URL-friendly slugs.',
    seoTitle: 'Free URL Slug Generator - Convert Titles to Clean Slugs',
    seoDescription: 'Convert headlines and titles into SEO-friendly, URL-safe slug strings.',
    componentKey: 'slug-generator',
    toolType: 'hardcoded',
    howToUse: [
      'Type or paste your article headline or title.',
      'The tool automatically strips special characters and spaces.',
      'Copy your clean lowercased URL slug.'
    ],
    benefits: [
      'Creates clean SEO-friendly URLs',
      'Removes special characters automatically',
      'Converts spaces to hyphens'
    ],
    faqs: [
      { question: 'What makes a good URL slug?', answer: 'A good URL slug is concise, lowercased, hyphen-separated, and contains focus keywords.' }
    ]
  }
];

async function seedTools() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing tools collection...');
    await Tool.deleteMany({});

    console.log('Inserting 20 core tools...');
    const createdTools = await Tool.insertMany(toolsData);

    console.log(`Successfully seeded ${createdTools.length} tools into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tools collection:', error);
    process.exit(1);
  }
}

seedTools();