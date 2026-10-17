# Official Privacy & Data Policy

**Application:** Pocket Advisor (Android)  
**Package:** `com.pocketadvisor.app`  
**Developer/Owner:** Deepesh Garg  
**Effective Date:** September 2026  
**Last Updated:** October 2026  

---

## 1. Overview

Pocket Advisor (“Pocket Advisor”, “we”, “our”, “us”, or the “App”) is an Android application developed and operated by Deepesh Garg.

Pocket Advisor provides personal expense tracking, budgeting, automatic transaction detection from incoming banking and payment SMS alerts, smart bill and EMI reminders, shopping lists, financial planning calculators, collaborative bill splitting and debt minimization, UPI payment facilitation, and AI-powered spending insights.

We follow a privacy-by-design, local-first approach and aim to minimize the collection and transmission of personal and spending information to what is reasonably necessary to provide the features you choose to use.

We do not sell your personal or spending information to data brokers.

This Privacy Policy explains what information Pocket Advisor processes, where it is processed, when it may leave your device, and how you can control, export, or delete your information.

---

## 2. Information We Process

### 2.1 Account Information
When you create or access a Pocket Advisor account, we may process information associated with your account, including:
* Email address
* Supabase authentication identifier (`user_id`)
* Authentication tokens and session information required to maintain your account
* Information associated with Google Sign-In, when you choose to use it

Your authentication credentials are handled through the applicable authentication provider (Supabase Auth / Google Sign-In). Pocket Advisor does not receive or store your plaintext Google account password.

### 2.2 Spending, Expense, Reminder, and Planning Information
Pocket Advisor may process information that you enter, generate, detect, or approve within the App, including:
* **Transactions & Ledger Data:** Transaction amounts, original multi-currency amounts and ISO currency codes (`original_amount`, `original_currency`), transaction dates/timestamps, categories (default and custom), merchant information, transaction types (income/expense), payment modes (Cash, Card, UPI, Net Banking), and custom notes.
* **Budgets & Income:** Salary information, monthly budgets, and category-specific spending limits.
* **Bill, Subscription & Loan/EMI Reminders:** Payee/biller names, reminder amounts, exact due dates, payment completion status, reminder types (`BILL`, `SUBSCRIPTION`, `EMI`), recurrence intervals (`NONE`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`), loan installment tracking (`totalInstallments`, `remainingInstallments`), and SMS auto-reconciliation preferences.
* **Shopping Lists:** Shopping list group names, item titles, estimated prices, quantities, category tags, and checked/purchased status.
* **Shared & Group Expenses:** Group names, 6-character group codes, member display names, registered member user IDs, group invitations (`fromUserId`, `fromUserName`, `toUserId`, invitation status), shared expense descriptions and amounts, split shares, balances, and calculated debt settlements.

Personal spending, reminder, and shopping list information is stored locally on your device by default and is only uploaded or processed remotely when you use Cloud Sync/Backup (Section 5), participate in shared Split Groups (Section 7), or query the AI Advisor (Section 8).

### 2.3 AI Copilot Chat History
When you use the AI Copilot (AI Financial Advisor), Pocket Advisor may store your AI conversation history, including your questions and the AI-generated responses, in your Pocket Advisor account using Supabase.

Chat history may be used to provide continuity between conversations and to help generate more relevant and personalized budgeting and spending insights based on previous interactions.

Depending on what you ask the AI Copilot, your conversation history may contain spending, budget, or other information that you voluntarily provide. You should avoid entering sensitive personal identifiers or account numbers that are not necessary to receive the requested assistance.

### 2.4 Referrals and Install Attribution ("Refer & Earn")
When you participate in the Pocket Advisor "Refer & Earn" program, we process:
* Your unique 6-character referral code
* Referral link claims and invitation status
* Reward eligibility and complimentary Pocket Advisor Pro entitlement status

Pocket Advisor integrates the **Google Play Install Referrer API** (`com.android.installreferrer`) solely to detect referral codes passed during app installation from the Google Play Store so that referral rewards can be accurately credited to both the referrer and the invited user.

---

## 3. Local-First Storage, Biometric Security, Device Integrity & Widgets

### 3.1 Encrypted Local Database & Android Keystore
Pocket Advisor is designed with local-first data handling. Your financial ledger, reminders, shopping lists, and group records are stored locally on your Android device in an encrypted SQLite (Jetpack Room) database protected using **SQLCipher AES-256 encryption**.

The cryptographic master key used to encrypt the local database is generated and protected inside the hardware-backed **Android Keystore** (`KeystoreHelper`), and security preferences are stored using Jetpack DataStore and `EncryptedSharedPreferences`. Local storage allows core expense-management functionality and financial calculators (EMI, SIP, Savings Goal, FD/RD, Compound Interest, and Inflation calculators) to operate offline on your device.

### 3.2 Biometric App Lock & Screen Protection
* **Biometric Authentication:** When you enable App Lock in User Settings, authentication (fingerprint, face unlock, or device PIN/pattern) is performed strictly on-device using the Android system `BiometricPrompt` (AndroidX Biometric) API. Pocket Advisor never accesses, collects, stores, or transmits your raw biometric data or templates.
* **Screen Capture Protection:** When App Lock is active, Pocket Advisor applies Android's `FLAG_SECURE` window protection to prevent unauthorized screenshots, screen recordings, and app-switcher preview leaks of your financial data.

### 3.3 Device Integrity & Root Detection
Pocket Advisor uses an on-device integrity verification library (`RootBeer`) to check for indicators of a rooted or compromised environment (such as `su` binaries or root management packages) to warn you of potential risks to your local database security. These checks run strictly on your device; no lists of installed applications or device integrity logs are transmitted to external servers.

### 3.4 Home Screen Widgets
If you choose to add Pocket Advisor widgets (such as the **Expense Overview Widget** or **Interactive Shopping List Widget**) to your Android Home Screen, selected spending totals, remaining budget bars, or shopping checklist items are rendered locally on your home screen via Android `RemoteViews`. The Expense Overview Widget includes a built-in privacy toggle (eye icon) allowing you to mask sensitive monetary amounts on your home screen at any time.

---

## 4. Automatic Expense Tracking and SMS Access

Pocket Advisor provides an optional automatic expense-tracking feature that detects financial transactions directly from incoming banking, credit/debit card, and UPI transaction SMS alerts on your device using Android's SMS permissions (`RECEIVE_SMS`).

### 4.1 Explicit Permission and Control
To use this optional feature, you must explicitly grant SMS permission after reviewing our prominent in-app disclosure dialog. SMS tracking is completely optional and disabled by default. You can enable, disable, or revoke this permission at any time through the App settings or via **Android Settings > Apps > Pocket Advisor > Permissions**.

### 4.2 100% On-Device SMS Parsing
All SMS text inspection and linguistic parsing occurs strictly locally on your Android device (`SmsParser` & `SmsProcessingWorker`). **Raw incoming SMS message text is never transmitted to, stored on, or shared with Pocket Advisor's servers, backend infrastructure, or any third party.**

* Only structured transaction fields extracted from a verified financial alert (amount, currency, transaction type, merchant name, category, and timestamp) are recorded in your local encrypted database.
* If you have enabled Auto-Reconciliation for a scheduled bill reminder, the on-device parser may match an incoming payment alert against your pending bill reminder to mark it as paid locally.
* Extracted transaction entries are only synced to the cloud or included in AI summaries if you are signed in with Cloud Sync/Backup enabled (Section 5) or when you query the AI Advisor (Section 8).
* Pocket Advisor strictly filters and ignores personal messages, private conversations, promotional spam, and one-time passwords (OTPs). You can review, edit, or delete automatically detected transactions at any time within the App.

### 4.3 No Bank Credentials
Pocket Advisor does **NOT** require, request, or collect your bank username, login password, UPI PIN, ATM PIN, full debit/credit card numbers, CVV, or any other banking credentials.

---

## 5. Cloud Backup and Synchronization

Pocket Advisor provides cloud synchronization and backup powered by Supabase for authenticated users so you can safeguard your records and access them across sessions or devices.

* **Personal Ledger & Planning Data (`ExpenseCloudSyncManager` & `SmsCloudSyncWorker`):** When you are signed into your Pocket Advisor account and Cloud Backup/Sync is active, your structured transaction records (including SMS-extracted expenses), custom categories, budgets, bill/EMI payment reminders (`payment_reminders`), and shopping lists (`shopping_items`) are synchronized with your private Supabase cloud storage. Each record uses synchronization metadata (`isSynced`, `updatedAt`, and soft-deletion flags `isDeleted`) to resolve conflicts and replicate deletions accurately.
* **Disabling Cloud Backup:** You can use Pocket Advisor completely offline without signing in, or you can disable Cloud Backup in the App settings. When you disable Cloud Backup, Pocket Advisor stops future cloud synchronization and deletes existing cloud-backed-up personal ledger data in accordance with the App's deletion workflow. Ensure you retain any needed local records or exports before disabling Cloud Backup.

---

## 6. Data Synchronization and Security

When information is transmitted between Pocket Advisor and our cloud infrastructure, all network communication is strictly encrypted in transit using **HTTPS / TLS 1.3** (`usesCleartextTraffic="false"`).

Our backend uses **Supabase** and **PostgreSQL** security controls, including **Row Level Security (RLS)** policies, so that authenticated users can only access their own private financial records and authorized group records.

Despite these technical measures, no internet transmission, cloud service, database, or electronic storage system can be guaranteed to be 100% immune from every possible security threat or device compromise.

---

## 7. Bill Splitting, Group Data, UPI Payments, and External Sharing

### 7.1 Shared Split Groups and Invitations
Pocket Advisor allows users to create or join groups (via 6-character group codes or `pocketadvisor://invite` / `https://pocketadvisor.in/invite` deep links) for collaborative expense splitting and debt settlement (`SplitCloudSyncManager`). When you create, invite members to, or participate in a group, information relevant to that group is synchronized via Supabase and visible to other members of the same group, including:
* Group name, short code, and creator user ID
* Member display names and associated user IDs (for registered participants)
* Group invitation metadata (`fromUserId`, `fromUserName`, `toUserId`, and invitation status)
* Shared expenses, amounts, categories, notes, and payer details
* Individual member shares, net balances, settlement records, and simplified debt calculations

You should not enter confidential notes or information into a shared group that you do not want other members of that group to see.

### 7.2 Direct UPI Payments & On-Device QR Code Generation
* **UPI Deep Links & Local Package Queries (`UpiPaymentHelper`):** To help you settle group debts or bills quickly, Pocket Advisor can construct standard UPI payment intents (`upi://pay?pa=...`) using the payee UPI ID, name, and amount you specify. To display a chooser of compatible payment apps installed on your device (such as Google Pay, PhonePe, Paytm, CRED, BHIM, or Amazon Pay), the App queries your device's local Android Package Manager. **This package visibility query occurs strictly on-device; Pocket Advisor never collects or transmits a list of your installed applications to our servers.**
* **Client-Side QR Codes (`UpiQrDialog`):** Dynamic UPI QR codes for settling balances are generated strictly on your device using the embedded ZXing library.
* **No Payment Processing:** All UPI transfers are executed directly inside your chosen third-party UPI application. Pocket Advisor does not process payments, act as a payment gateway, or have access to your UPI PIN or bank account credentials.

### 7.3 WhatsApp Reminders & Statement Exports
* **WhatsApp Reminder Sharing (`WhatsAppReminderHelper`):** When you tap to share a bill notification or split reminder via WhatsApp, Pocket Advisor formats the text on-device and hands it off to WhatsApp using a standard Android share intent only upon your explicit action.
* **PDF & CSV Exports:** When you generate PDF statements (`PdfReportGenerator`, `SplitStatementGenerator`) or CSV ledger exports, files are created locally on your device using Android Scoped Storage and shared securely via Android `FileProvider` only with the apps or destinations you select.

---

## 8. AI Advisor (AI Budget Copilot)

Pocket Advisor includes both an **On-Device Financial Intelligence Engine** and a cloud-based conversational **AI Financial Advisor (AI Budget Copilot)**:

1. **On-Device Financial Intelligence (`FinancialIntelligenceEngine`):** Burn-rate projections, monthly budget overrun warnings, and 30-day category spike detections are calculated locally on your device without sending data to external servers.
2. **Cloud AI Advisor (`GeminiAiService`):** When you actively chat with the AI Advisor or tap an AI prompt, your query is sent through Pocket Advisor's backend infrastructure (via a secure Supabase Deno Edge Function) to **Google Gemini**. Depending on your question, the context transmitted may include:
   * High-level, anonymized financial summaries (total monthly spend, top spending categories, active budget limits, and burn-rate metrics)
   * Relevant expense, budget, reminder, or bill-splitting context needed to answer your specific prompt
   * Relevant AI Copilot conversation history for continuity

We do not intentionally send bank passwords, UPI PINs, authentication passwords, raw SMS text, or personal identity documents to the AI model.

### AI Provider Data Handling & Disclaimer
Google's processing of Gemini API requests is governed by Google's applicable API terms and privacy policies. You should avoid submitting sensitive personal identifiers into the AI chat that you do not want processed by an external AI service.

**Disclaimer:** The AI Advisor provides informational budgeting, mathematical projections, and spending summaries only and does not provide regulated investment, legal, tax, or certified financial planning advice.

---

## 9. Advertising, Google AdMob, and User Consent

The free/freemium version of Pocket Advisor displays advertisements through the **Google Mobile Ads SDK (Google AdMob)**, including selective banner ads and optional rewarded ads (such as unlocking bonus AI queries). Core financial workspaces—including the Main Dashboard, Analytics, and Split Bills screens—are kept free of intrusive banner ads.

AdMob and related Google advertising technologies may collect and process information such as your Android Advertising ID (AAID), device identifiers, coarse location/IP address, diagnostic logs, and ad interaction metrics for ad delivery, measurement, and fraud prevention.

Pocket Advisor **never** shares your private financial ledger, SMS-parsed expenses, transaction notes, or budget figures with AdMob or any advertising network.

### User Messaging Platform (UMP) & Consent Choices
For users in the European Economic Area (EEA), the United Kingdom, and other jurisdictions requiring explicit consent under GDPR or ePrivacy laws, Pocket Advisor integrates the **Google User Messaging Platform (UMP) SDK** to present certified consent choices and manage personalized vs. non-personalized advertising preferences. You can also reset or opt out of personalized advertising at any time in your device's **Android Settings > Google > Ads**.

---

## 10. Pocket Advisor Pro (Subscriptions)

Pocket Advisor offers paid Premium subscription plans known as **Pocket Advisor Pro** through **Google Play Billing**.

Premium subscribers receive an ad-free experience and other Pro features identified within the App (such as extended AI Advisor access, PDF statement exports, real-time cloud sync, and unlimited split groups and custom categories). Pocket Advisor does not directly receive, process, or store your full credit card, debit card, or UPI payment credentials; all subscription billing transactions and entitlement validations are handled through Google Play and are subject to Google's applicable terms and policies.

You may manage or cancel your subscription at any time through your Google Play account settings. Cancellation prevents future automatic renewals but does not retroactively refund the unused portion of an active billing period. Refunds are governed by applicable law, Google Play's billing policies, and our Cancellation & Refund Policy.
---

## 11. Third-Party Services & SDKs

Pocket Advisor relies on carefully selected third-party infrastructure and SDKs to operate specific features of the App:
* **Supabase** — User authentication (GoTrue), PostgreSQL cloud database with Row Level Security, Cloud Backup/Sync, Split Group synchronization, and Edge Functions.
* **Google Gemini API** — Cloud AI processing for the conversational AI Financial Advisor.
* **Google Firebase Crashlytics & Firebase Analytics** — Crash reporting, diagnostic stack traces, and aggregated application usage telemetry to help us identify bugs and improve stability.
* **Google Firebase Remote Config** — Delivery of server-side feature flags, ad frequency thresholds, and in-app service announcements (`AnnouncementSyncWorker`).
* **Google AdMob & Google User Messaging Platform (UMP)** — Ad delivery for free-tier users and regional privacy consent management.
* **Google Play Billing & Google Play Install Referrer API** — Subscription management and referral install attribution.
* **Currency Exchange Rate API (`CurrencyExchangeService`)** — Fetches live foreign exchange rates using only currency code pairs (no personal or transaction data is sent) when you convert display currencies.

Each third-party provider processes data in accordance with its own privacy policy and terms of service.

---

## 12. How We Use Information

We use information processed through Pocket Advisor to:
* Create, authenticate, and secure your user account;
* Provide local and cloud-synced expense tracking, bill reminders, shopping lists, and budget planning;
* Detect and categorize supported banking/payment SMS alerts locally on your device;
* Synchronize shared expenses, invitations, and debt settlements across Split Group participants;
* Generate conversational AI financial insights and on-device spending anomaly alerts;
* Administer the "Refer & Earn" program and grant Pocket Advisor Pro rewards;
* Deliver non-intrusive advertisements to free-tier users and process Pro subscriptions;
* Monitor app stability, fix crashes, fetch configuration updates, and prevent fraud or abuse; and
* Comply with applicable legal obligations.

We **never** sell your personal or financial information to third parties or data brokers.

---

## 13. Data Retention

* **Local On-Device Data:** Remains stored in your device's encrypted SQLCipher database until you delete individual records, trigger "Clear All Data" inside the App, clear app storage, or uninstall the App.
* **Cloud-Synced Data & AI Chat History:** Retained in your Supabase account for as long as you maintain an active account and have Cloud Sync enabled, allowing you to restore your ledger across devices.
* **Account Deletion:** When you delete your Pocket Advisor account, we permanently delete your personal profile, cloud-backed transactions, payment reminders, shopping lists, AI Copilot chat history, and referral records from our active databases. Some deletion processes across encrypted backups may take a short, reasonable window (typically up to 30 days) to complete, unless retention of specific records is legally required for fraud prevention or regulatory compliance.

---

## 14. Account Deletion and Local Data Purge

You have complete control over erasing your data both locally and in the cloud:

1. **Instant Local Data Purge ("Clear All Data"):** Within the App settings, you can trigger a complete local wipe (`LocalDataPurgeManager`), which immediately erases all local SQLCipher database tables, clears encrypted preferences, revokes local Keystore keys, and resets the App to a factory-fresh state.
2. **In-App Cloud Account Deletion:** You can permanently delete your Pocket Advisor account and all associated cloud records directly from the App settings.
3. **Web Account Deletion (If Uninstalled):** If you have already uninstalled the App, you can request permanent account and cloud data deletion through our **Verified Web Deletion Portal** on `pocketadvisor.in` or by emailing **privacy@pocketadvisor.in** from your registered email address.

When your account deletion is completed, we permanently delete your:
* Account profile and authentication records
* Cloud-backed expenses, income, and custom categories
* Cloud-backed bill/EMI reminders and shopping lists
* Salary and budget configurations
* Personal group membership associations and pending invites
* AI Copilot conversation history

Account deletion is permanent and irreversible. Please export any statements or backups (Section 15) you wish to retain prior to deleting your account.

---

## 15. Data Export and Access

Pocket Advisor allows you to export your financial records at any time in standard, portable formats, including:
* Formatted **PDF financial statements** and **Group Split statements**
* Raw **CSV spreadsheet files** compatible with Excel and Google Sheets
* Local **JSON/CSV backup files**

You may also contact us with questions or requests regarding access to or correction of your personal information, subject to reasonable identity verification.

---

## 16. Your Privacy Choices and Permissions Summary

Depending on the features you use, you have granular control over your privacy within the App:
* **SMS Permission (`RECEIVE_SMS`):** Optional and off by default; revocable anytime in App or Android Settings.
* **Exact Alarms & Notifications (`POST_NOTIFICATIONS`, `SCHEDULE_EXACT_ALARM`):** Used only to deliver timely bill reminders and transaction alerts; configurable in Settings.
* **Biometric App Lock (`USE_BIOMETRIC`):** Optional on-device security toggle with automatic 30-second background lock timeout.
* **Cloud Backup & Sync:** Use the App offline-only, or enable/disable Cloud Sync for your account.
* **Advertising Consent:** Manage personalized ad consent via the in-app privacy settings or Android system settings, or upgrade to Pocket Advisor Pro for a 100% ad-free experience.
* **AI Advisor:** Only processes data when you actively submit a prompt in the chat interface.

---

## 17. Children's Privacy

Pocket Advisor is intended for individuals **18 years of age or older**. We do not knowingly collect personal information from children under 18. If you believe that a person under 18 has provided personal information to Pocket Advisor, please contact us at **privacy@pocketadvisor.in** so we can promptly delete the information.

---

## 18. International Availability & Regional Privacy Rights

Pocket Advisor is operated from India and made available globally with multi-currency and multi-language support. Depending on your jurisdiction—including under India's **Digital Personal Data Protection Act (DPDPA)**, the European Union's **GDPR**, or applicable US state privacy laws—you may have the right to access, correct, export, withdraw consent for, or erase your personal data. You can exercise these rights directly using our built-in export, permission, and deletion tools (Sections 14–16) or by contacting our Grievance Officer / Privacy Contact below.

---

## 19. Security Summary

We implement defense-in-depth technical and organizational safeguards to protect your data:
* **On-Device Encryption:** SQLCipher AES-256 database encryption with hardware-backed Android Keystore master keys (`TEE` / `StrongBox`).
* **Transport Security:** Mandatory HTTPS / TLS 1.3 encryption for all network traffic with cleartext traffic strictly disabled.
* **Database Isolation:** Supabase PostgreSQL Row Level Security (RLS) enforcing strict per-user and per-group access boundaries.
* **UI & Hardware Safeguards:** Biometric App Lock, automatic background lock timeout, `FLAG_SECURE` screenshot prevention, and on-device root detection.

While we strive to use enterprise-grade security practices, no software or electronic storage system can guarantee absolute security under all circumstances.

---

## 20. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect new features, changes in our data-processing practices, third-party SDK updates, or legal requirements. When material changes are made, we will update the "Last Updated" date at the top of this page and may notify you via an in-app announcement or website notice.

---

## 21. Contact Us & Grievance Redressal

If you have any questions, concerns, data requests, or grievances regarding this Privacy Policy or how Pocket Advisor handles your information, please contact:

**Deepesh Garg**  
Developer & Privacy Officer — Pocket Advisor  
**Email:** privacy@pocketadvisor.in  
**Website:** https://www.pocketadvisor.in  