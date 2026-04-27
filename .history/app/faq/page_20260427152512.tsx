"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const faqCategories: { category: string; items: { question: string; answer: string }[] }[] = [
    {
      category: "General Platform FAQs",
      items: [
        { question: "What is Uptrender trading platform?", answer: "Uptrender is an advanced all-in-one online trading platform that allows users to trade in the Indian stock market, Forex market, and Crypto market using a single dashboard. Instead of using multiple apps or broker platforms, Uptrender combines everything in one place. Users can trade manually, use automated strategies, or copy expert traders easily. The platform is designed for beginners as well as professional traders." },
        { question: "Who can use the Uptrender platform?", answer: "Uptrender can be used by anyone who is interested in online trading, including beginners, investors, traders, strategy creators, and professionals. You do not need deep technical knowledge or coding skills to use the platform. Even users with no prior trading experience can start by using copy trading or pre-built strategies. The interface is simple and user-friendly." },
        { question: "Is Uptrender suitable for beginners?", answer: "Yes, Uptrender is specially designed to be beginner-friendly. New users can start trading without understanding complex charts or indicators. Features like copy trading, automated strategies, and strategy marketplace allow beginners to participate in trading by following experts. The dashboard is simple, clear, and easy to understand." },
        { question: "Do I need trading experience to start using Uptrender?", answer: "No, trading experience is not mandatory. Uptrender provides ready-made strategies and expert traders that beginners can follow. Users can also learn gradually by observing trades, performance reports, and strategy behavior. This makes Uptrender a learning-friendly trading platform for new users." },
        { question: "Which markets are supported on Uptrender?", answer: "Uptrender supports multiple markets including the Indian stock market (equity and options), Forex trading, and Cryptocurrency trading. This allows users to diversify their trading activities from one platform. Market availability depends on broker API and market hours." },
        { question: "Is Forex trading legal on Uptrender?", answer: "Uptrender itself is a technology platform and does not execute trades directly. Forex trading is done through supported brokers using official APIs. Users must follow the rules and regulations of their broker and country. Uptrender only provides the trading infrastructure." },
        { question: "Can I trade cryptocurrency on Uptrender?", answer: "Yes, Uptrender allows users to trade cryptocurrencies through supported integrations. Crypto trading works 24/7 depending on market conditions and broker availability. Users can monitor trades, strategies, and performance from the same dashboard used for stocks and Forex." },
        { question: "Is Uptrender a broker?", answer: "No, Uptrender is not a broker. It is a trading automation and management platform. All trades are executed through your connected broker account using secure API connections. Uptrender does not hold your funds or execute trades independently." },
        { question: "Is my data safe on Uptrender?", answer: "Yes, user data security is a top priority. All sensitive information such as login credentials and broker API details are encrypted. Uptrender follows industry-standard security practices to protect user data, trading information, and transactions." },
        { question: "Does Uptrender guarantee profit?", answer: "No, Uptrender does not guarantee profits. Trading in financial markets always involves risk. While Uptrender provides powerful tools, strategies, and automation, profits depend on market conditions and trading decisions. Users should trade responsibly." },
        { question: "Can I access Uptrender from mobile?", answer: "Yes, Uptrender is a web-based trading platform that works smoothly on mobile browsers as well as desktop systems. You do not need to install any application. Just login through your browser and access all features." },
        { question: "Does Uptrender work 24/7?", answer: "The Uptrender platform itself works 24/7. However, trades are executed only when the respective market is open. Crypto markets operate 24/7, while Indian and Forex markets follow specific trading hours." },
        { question: "What happens during market holidays?", answer: "During market holidays, trades will not execute for that specific market. Strategies may remain active but will resume trading only when the market reopens. This is normal behavior and does not indicate any system issue." },
        { question: "Can I use multiple strategies at the same time?", answer: "Yes, users can run multiple strategies at the same time depending on their subscription plan and wallet balance. Each strategy works independently. Make sure your broker and wallet balance can support multiple trades." },
        { question: "Can admin see my trading activity?", answer: "Yes, admin can see trade activity for monitoring, compliance, and support purposes. Admin access helps in troubleshooting issues and ensuring platform stability. However, admin cannot misuse or modify your broker account directly." },
        { question: "Can I access my account from different locations?", answer: "Yes, you can login to your Uptrender account from any location using your credentials. For security reasons, unusual login activity may require verification." },
        { question: "What happens if Uptrender server goes down?", answer: "Uptrender has infrastructure monitoring in place. In rare cases of downtime, trades already sent to broker remain safe. Platform services are restored automatically once the issue is resolved." },
        { question: "Is customer support available on Uptrender?", answer: "Yes, Uptrender has a built-in Support Ticket System. Users can raise tickets for any issue and track responses directly from their dashboard without calling or emailing." },
        { question: "Can I use Uptrender for learning trading?", answer: "Yes, many users use Uptrender as a learning platform by observing strategies, copy trading experts, and analyzing performance data. This helps users understand market behavior gradually." },
        { question: "Is Uptrender suitable for professional traders?", answer: "Yes, professional traders can use advanced features like strategy creation, API trading, copy trading master accounts, and performance analytics. Uptrender supports scalable and professional trading operations." }
      ]
    },
    {
      category: "User Account, Login & Profile",
      items: [
        { question: "How do I create an account on Uptrender?", answer: "To create an Uptrender account, simply click on the Sign Up button and register using your email address and password. After registration, you may need to verify your email and wait for admin approval. Once approved, you can log in and access all platform features based on your subscription plan." },
        { question: "Why is my Uptrender account not active after registration?", answer: "If your account is not active, it usually means that admin approval or verification is pending. This is done to prevent fake or duplicate accounts. Once admin verifies your details, your account will be activated automatically." },
        { question: "I forgot my password. How can I reset it?", answer: "If you forget your password, click on the Forgot Password option on the login page. Enter your registered email address, and you will receive a password reset link. Follow the instructions to set a new password securely." },
        { question: "Why am I unable to login to my account?", answer: "Login issues may occur due to incorrect email or password, inactive account status, or temporary system maintenance. Make sure your credentials are correct and your account is active. If the issue continues, raise a support ticket." },
        { question: "Can admin deactivate my account?", answer: "Yes, admin has the authority to deactivate accounts if there is policy violation, misuse, payment issue, or plan expiry. This helps keep the platform safe and organized. You can contact support to know the exact reason." },
        { question: "How do I update my profile information?", answer: "You can update your profile by going to Account Settings and clicking the edit icon. From there, you can update your name, profile picture, and other personal details. Always save changes after editing." },
        { question: "Can I change my registered email address?", answer: "Email address changes usually require admin approval for security reasons. This is done to prevent unauthorized account access. Contact support if you need to change your email." },
        { question: "Why is my email or phone not verified?", answer: "Your email or phone may not be verified if you missed the verification link or entered incorrect details. Verification helps secure your account. If verification fails, admin can manually verify it." },
        { question: "What happens if my account is deleted?", answer: "If your account is deleted by admin, all your data including wallet balance, strategies, trades, and history will be permanently removed. Deleted accounts cannot be recovered." },
        { question: "Can admin login as my account?", answer: "Yes, admin can login as a user only for support and troubleshooting purposes. This helps admin identify issues faster and provide better assistance." },
        { question: "Can admin see my broker login or password?", answer: "No. Broker credentials and API keys are encrypted and hidden. Admin cannot view your broker password or place trades manually inside your broker account." },
        { question: "How do I logout from Uptrender safely?", answer: "Always use the Logout button available in the dashboard menu. This ensures your session ends properly and protects your account from unauthorized access." },
        { question: "Can I use my account on multiple devices?", answer: "Yes, you can access your account from multiple devices. However, repeated logins from different locations may trigger security checks." },
        { question: "Can I restrict admin access to my account?", answer: "No. Admin access is platform-level and required for system management, compliance, and support. This access does not allow misuse of your funds." },
        { question: "How do I change my account password?", answer: "Go to Account Settings → Security & Password, then update your password. It is recommended to change passwords regularly for safety." },
        { question: "What should I do if I suspect unauthorized login?", answer: "Immediately change your password and raise a support ticket. Admin will investigate login activity and secure your account." },
        { question: "How do I contact customer support?", answer: "You can contact support by creating a ticket through the Contact Support section inside your dashboard. All communication is tracked for transparency." }
      ]
    },
    {
      category: "Wallet, Payments & Billing",
      items: [
        { question: "What is the Uptrender wallet and why is it required?", answer: "The Uptrender wallet is a prepaid balance system used to pay for platform services such as strategy subscriptions, trade execution fees, API usage, and copy trading charges. Instead of paying separately for each action, users maintain wallet balance so everything runs smoothly without interruption." },
        { question: "How do I add money to my wallet?", answer: "You can add funds by clicking the Add Funds button in your wallet section. Uptrender supports multiple payment methods like UPI, Razorpay, and crypto wallets. Once payment is successful, the wallet balance is updated automatically." },
        { question: "Why is wallet balance different from the amount I paid?", answer: "In some cases, admin may sell wallet credits at a premium price. For example, you may pay ₹1100 to receive ₹1000 wallet balance. This pricing structure helps maintain platform operations and services." },
        { question: "Is there a minimum wallet balance requirement?", answer: "Yes. A minimum wallet balance is required to keep strategies active and execute trades. The exact minimum balance depends on your subscription plan and the type of trading activity you perform." },
        { question: "What happens if my wallet balance becomes zero?", answer: "If your wallet balance reaches zero, all paid services such as strategy execution, copy trading, and manual trades will stop automatically. This prevents negative balance and protects users from unexpected charges." },
        { question: "Can I withdraw money from my Uptrender wallet?", answer: "In most cases, wallet balance is non-withdrawable because it is meant for platform usage only. Withdrawal availability depends on admin policy and plan terms mentioned inside the platform." },
        { question: "Why was money deducted automatically from my wallet?", answer: "Automatic deductions occur for services such as strategy subscriptions, per-trade execution fees, broker API connection fees, and copy trading fees. These deductions ensure uninterrupted platform usage." },
        { question: "What is a per-trade fee and why is it charged?", answer: "A per-trade fee is a small platform charge deducted every time a trade is executed. This fee covers system infrastructure, API costs, and trade monitoring services. It applies regardless of profit or loss." },
        { question: "Why was wallet balance deducted even when my trade was in loss?", answer: "Platform fees are charged for trade execution, not trade outcome. Whether the trade results in profit or loss, the system resources are used, which is why the fee is deducted." },
        { question: "My payment failed but money was deducted. What should I do?", answer: "Sometimes banks delay payment confirmation. Wait a few minutes and refresh your wallet. If the amount is not credited, raise a support ticket with the payment reference number." },
        { question: "Are online payments on Uptrender secure?", answer: "Yes. Uptrender uses trusted payment gateways like Razorpay and secure blockchain networks for crypto payments. All transactions follow industry security standards." },
        { question: "What is broker API connection fee?", answer: "API connection fee is charged when you connect your broker account to Uptrender. This fee covers real-time trade execution, data synchronization, and platform maintenance." },
        { question: "Will my wallet balance expire?", answer: "Wallet balance generally does not expire unless explicitly mentioned in your subscription plan or promotional offer terms." },
        { question: "Can I change my payment method later?", answer: "Yes. You can update or switch payment methods from the Plan Info and Billing section of your account anytime." },
        { question: "Are taxes included in wallet charges?", answer: "Tax handling depends on admin pricing policy. Any applicable taxes or charges will be clearly mentioned during payment or inside the plan details." },
        { question: "Can I use cryptocurrency wallet to add funds?", answer: "Yes. Uptrender supports crypto payments using wallets like MetaMask on Ethereum, Polygon, and BSC networks, depending on platform configuration." },
        { question: "Why do I need wallet balance even after buying a subscription plan?", answer: "Subscription plans define access limits, but wallet balance is still required to pay for trade execution, API usage, and other variable charges." },
        { question: "How do I upgrade my wallet plan or billing settings?", answer: "You can manage your plan, billing history, and payment methods from Plan Info → Billing & Payments section inside your dashboard." }
      ]
    },
    {
      category: "Strategy, Marketplace & Automation",
      items: [
        { question: "What is a trading strategy on Uptrender?", answer: "A trading strategy is an automated set of instructions that executes trades on your behalf according to predefined rules. They help users save time, reduce mistakes, and make trading systematic." },
        { question: "Can I run multiple strategies at the same time?", answer: "Yes, you can run multiple strategies simultaneously depending on your subscription plan, wallet balance, and broker limits. Each strategy works independently and tracks its own trades and performance." },
        { question: "What is the Strategy Marketplace?", answer: "The Strategy Marketplace is like an app store for trading strategies. Users can browse, view details, and subscribe to strategies created by the admin or expert users. Each strategy shows performance, capital required, and subscription fees." },
        { question: "What is the difference between public and private strategies?", answer: "Public strategies can be subscribed to by any user in the marketplace. Private strategies are restricted and only visible to the creator or selected users. This ensures flexibility for strategy creators and followers." },
        { question: "Why can't I start a strategy?", answer: "There are several reasons a strategy may not start: wallet balance is insufficient, strategy is inactive or expired, your subscription plan does not allow this strategy, or the broker API is disconnected. Check all these conditions to ensure proper execution." },
        { question: "How do I stop a running strategy?", answer: "You can stop a strategy anytime by going to the Strategy Dashboard, clicking the three-dot menu next to the strategy, and selecting Stop. Stopping a strategy will pause all future trades but will not close trades that have already been executed." },
        { question: "What happens to open trades if a strategy is stopped?", answer: "Open trades remain active on the broker platform until they are closed according to the strategy rules or manually by the user. Stopping a strategy only prevents new trades from being executed." },
        { question: "Can strategies trade multiple symbols?", answer: "Yes. Strategies can be configured to trade multiple symbols or markets based on their design. Users should check the strategy details for supported symbols." },
        { question: "Are strategies safe to use?", answer: "Strategies reduce manual trading errors and save time but do not eliminate market risk. Past performance is shown to help users make informed decisions, but profits are not guaranteed." },
        { question: "Can I see a strategy's past performance?", answer: "Yes. Each strategy card in the marketplace includes historical performance data, success rate, and trade summaries, which helps users evaluate risk and potential return." },
        { question: "Why was my strategy subscription fee deducted from wallet?", answer: "When you subscribe to a paid strategy, the platform automatically deducts the subscription fee from your wallet. This ensures continuous access without manual payment each month." },
        { question: "Can I cancel a strategy subscription?", answer: "Most subscriptions are non-refundable, but you can stop the strategy at any time to prevent future charges. Always check plan terms for refund policies." },
        { question: "Can I create my own strategy?", answer: "Yes, if your subscription plan allows strategy creation. You can define rules, capital allocation, markets, and automation type. Your strategy can remain private or be published in the marketplace." },
        { question: "What is a strategy's required capital?", answer: "Each strategy shows a minimum capital amount required to start trading. This ensures trades are executed effectively and avoids insufficient funds issues." },
        { question: "Can strategies execute trades automatically?", answer: "Yes. Automated strategies connect to your broker API and execute trades based on predefined rules without manual intervention. Manual intervention is only needed if you wish to stop, edit, or adjust the strategy." },
        { question: "Why did my strategy fail to execute trades?", answer: "Strategies may fail to execute due to disconnected broker API, market closure, insufficient wallet balance, or inactive/expired strategy. Check all conditions and ensure your account is ready." },
        { question: "What happens if my broker disconnects during a strategy?", answer: "If the broker API disconnects, the strategy will stop executing trades automatically. Reconnect the API and the strategy will resume according to its rules." },
        { question: "How can I view strategy details?", answer: "Click on View Details for any strategy in the dashboard or marketplace. This shows complete performance data, trade history, capital requirements, symbols traded, and other relevant information." },
        { question: "Can admin delete or stop any strategy?", answer: "Yes. Admin has full control over platform strategies. Admin can stop, delete, or convert private strategies to public and vice versa to maintain platform integrity." }
      ]
    },
    {
      category: "Trade, Copy Trading & Execution",
      items: [
        { question: "What is manual trading on Uptrender?", answer: "Manual trading allows users to place trades themselves by choosing the market, symbol, quantity, price, and Buy/Sell option. It provides full control over trades, unlike automated strategies. Manual trading is ideal for experienced users who want to execute specific trades at their discretion." },
        { question: "What is copy trading and how does it work?", answer: "Copy trading lets beginners or followers automatically replicate trades made by expert traders (master accounts). When a master executes a trade, all connected child accounts copy the trade in real-time. This allows users to benefit from expert strategies without deep market knowledge." },
        { question: "Who is a master account in copy trading?", answer: "A master account belongs to an expert trader who executes trades on the platform. Other users, called child accounts, follow the master's trades. Master accounts are usually experienced and verified by the admin to ensure reliability." },
        { question: "Who is a child account in copy trading?", answer: "A child account is a follower that automatically copies the trades of a selected master account. Child accounts benefit from expert trading strategies without having to make manual decisions. Child accounts can stop following the master anytime." },
        { question: "Why was a copy trading fee deducted from my wallet?", answer: "Fees for copy trading are automatically deducted to cover system maintenance, strategy execution, and broker API integration. Fees are charged per active master-child connection and ensure uninterrupted service." },
        { question: "Can I stop copy trading anytime?", answer: "Yes. Users can disconnect from a master account at any time. Once disconnected, the system stops copying trades, and no further fees for that master account are deducted." },
        { question: "Why did my trade fail?", answer: "Trades can fail due to multiple reasons: broker API is disconnected or offline, market is closed, incorrect symbol or invalid quantity, or insufficient wallet balance. Check your trade details and reconnect APIs if needed." },
        { question: "What does a completed trade mean?", answer: "A completed trade is a successfully executed order that has been placed and confirmed by the broker. Profit or loss is calculated based on the market movement." },
        { question: "What does a failed trade mean?", answer: "A failed trade means the order was not executed due to a technical or account issue. Common causes include API disconnection, market closure, or insufficient funds." },
        { question: "Can admin delete trades?", answer: "Yes. Admin can delete trade records for maintenance, corrections, or compliance purposes. Deleted trades are removed permanently from the dashboard." },
        { question: "Why is my profit/loss (P&L) showing negative?", answer: "P&L reflects the difference between buy and sell prices. A negative P&L occurs when the market moves against your position. Strategies and copy trading do not guarantee profit, and losses are part of trading risk." },
        { question: "Can I place trades in multiple markets simultaneously?", answer: "Yes. Uptrender supports trades across Indian stock market, Forex, and Crypto. Users can execute multiple trades at once, as long as wallet balance and subscription limits allow." },
        { question: "How do I view my active and pending positions?", answer: "The Trade Panel has Positions and Orders tabs. Active positions show trades currently open, while pending orders show trades waiting for execution. This helps users track all trades in one place." },
        { question: "Why is a trade order pending for too long?", answer: "Pending orders can occur if the market is not open, price conditions for limit orders are not met, or broker API is temporarily delayed. Monitor your dashboard to track order status." },
        { question: "Can I edit a trade after placing it?", answer: "No. Trades cannot be edited once submitted. To change a trade, cancel the existing order (if pending) and place a new trade with correct details." },
        { question: "Can I export trade history?", answer: "Yes. Trade history can be exported depending on admin configuration. Exported data helps users analyze past trades, performance, and strategy effectiveness." },
        { question: "Can I copy multiple master accounts simultaneously?", answer: "Yes. Users can connect to multiple masters and split capital across them. Each master's trades are copied independently, with fees deducted per connection." },
        { question: "How are copy trading profits/losses calculated?", answer: "Copy trading P&L is calculated based on the child account's investment and the master account's executed trades. Profits and losses mirror the master's trades proportionally." },
        { question: "What happens if a master account disconnects?", answer: "If a master disconnects from the platform, all connected child accounts stop copying trades. Fees for that master are no longer deducted, but open trades remain active until closed by the broker." },
        { question: "How does wallet balance affect trades and copy trading?", answer: "A positive wallet balance is mandatory for executing trades, paying subscription fees, and maintaining copy trading connections. Insufficient balance will stop trades and copied trades until funds are added." },
        { question: "Can admin view my copy trading activity?", answer: "Yes. Admin can see all master-child connections, copied trades, and performance to monitor platform usage and maintain transparency. Admin cannot manipulate trades." }
      ]
    },
    {
      category: "Admin Panel & Platform Control",
      items: [
        { question: "What is the Admin Panel on Uptrender?", answer: "The Admin Panel is the control center for managing the entire Uptrender platform. Admins can monitor users, trades, strategies, wallets, subscriptions, support tickets, and platform settings all in one dashboard." },
        { question: "How do I manage users as an admin?", answer: "Admin can view, edit, verify, or delete users from the User Management section. Admin can also see account status, wallet balance, registration date, and activity logs. There is a search bar for quick access and the ability to add new users manually." },
        { question: "Can admin verify a user instantly?", answer: "Yes. Admin can toggle verification for any user to approve or restrict platform access. Verified users gain access to trading, strategies, and copy trading features." },
        { question: "Can admin login as a user for troubleshooting?", answer: "Yes. Admin can login as any user to see the platform exactly as the user sees it. This helps resolve issues faster, monitor behavior, and support users efficiently." },
        { question: "How does admin control trading strategies?", answer: "Admin can create, edit, delete, or stop strategies. Admin can also make strategies public or private. All strategy activity is monitored in the Strategy Dashboard, ensuring smooth operation and compliance." },
        { question: "Can admin view and manage trades?", answer: "Yes. Admin can view all trades in Trade Management, filter by market or trade status, and delete trades if needed. Admin can also track P&L, execution time, and trade history for each user." },
        { question: "Can admin place trades directly?", answer: "Yes. Using the Trade Panel, admin can place trades manually or execute trades using a strategy. Admin can track active positions, pending orders, and closed positions from the same interface." },
        { question: "How does admin manage copy trading?", answer: "Admin can monitor master and child accounts, view active connections, and ensure fees are deducted properly. Admin can also disable copy trading for specific accounts if needed." },
        { question: "Can admin create and manage subscription plans?", answer: "Yes. Admin can define different pricing tiers, plan duration, feature limits, and pricing. Admin can see total subscribers, popular plans, and edit or delete plans anytime." },
        { question: "How does admin manage wallets?", answer: "Admin can add or deduct wallet balance for users, monitor all transactions, and set pricing for wallet credits. Admin can also track revenue generated from trades, strategies, and copy trading." },
        { question: "Can admin view wallet transaction history?", answer: "Yes. Admin can view all credits and debits, including subscriptions, trade fees, API fees, and transfers. This ensures transparency and helps in auditing." },
        { question: "How does admin manage platform settings?", answer: "Admin can configure Platform Settings, App Settings, and Payment Gateways. This includes uploading logos, setting language, timezone, dark mode, auto-save preferences, and payment options." },
        { question: "Can admin upload platform logo and branding?", answer: "Yes. Admin can upload a logo with size and format guidelines, set alt text for accessibility, and add an optional clickable link." },
        { question: "How does admin configure payment gateways?", answer: "Admin can connect Razorpay with API keys, set UPI ID for payments, configure crypto wallets, and enable test mode for safe testing. Pending and successful payments are tracked in real-time." },
        { question: "Can admin manage user support tickets?", answer: "Yes. Admin can view total, open, in-progress, and resolved tickets, respond to users, change ticket status, and access full conversation history for efficient support." },
        { question: "How does admin handle security and passwords?", answer: "Admin can monitor account security, enforce password rules, and update platform security settings. Admin can also reset passwords for users if needed." },
        { question: "Can admin edit personal profile details?", answer: "Yes. Admin can update their own name, email, profile picture, mobile number, and currency preference from Account Settings." },
        { question: "How does admin track platform usage?", answer: "Admin can monitor user accounts used, API integrations active, strategies deployed, and other platform limits using progress bars in the admin dashboard." },
        { question: "Can admin control notifications and preferences?", answer: "Yes. Admin can toggle notifications, auto-save features, dark mode, items per page, and other app preferences to ensure optimal user experience." },
        { question: "How can admin add new users manually?", answer: "Admin can click Add New User in User Management, fill in required details like name, email, and plan, and instantly create an account. This is useful for onboarding VIP or corporate users." },
        { question: "Can admin assign roles to users?", answer: "Yes. Admin can set roles like regular user or admin. This controls access to certain features and sections of the platform." },
        { question: "How does admin monitor monthly earnings?", answer: "Admin dashboard shows total earnings from trades, strategies, subscriptions, and copy trading. This helps track revenue and make business decisions." },
        { question: "Can admin edit or delete support tickets?", answer: "Yes. Admin can manage ticket status, assign priority, and close or delete tickets when issues are resolved." },
        { question: "How does admin manage API integrations?", answer: "Admin can view active API integrations, add new connections, or remove old ones. API usage is monitored against plan limits to ensure smooth automated trading." },
        { question: "Can admin manage strategy marketplace settings?", answer: "Yes. Admin can approve user-created strategies, set which strategies appear in the marketplace, manage subscription pricing, and monitor performance data." },
        { question: "How does admin maintain platform compliance?", answer: "Admin can monitor all user activity, wallet transactions, trades, copy trading, and strategies to ensure compliance with rules, regulations, and internal policies." },
        { question: "Can admin generate reports for auditing?", answer: "Yes. Admin can export trade history, wallet transactions, subscription data, and strategy performance to maintain complete transparency and accountability." },
        { question: "How does admin prevent misuse of platform features?", answer: "Admin can verify users, set role-based access, stop inactive strategies, disconnect copy trading connections, and adjust wallet balances to prevent misuse and ensure platform security." }
      ]
    },
    {
      category: "Contact Support & Helpdesk",
      items: [
        { question: "How do I raise a support ticket on Uptrender?", answer: "To raise a support ticket, go to the Contact Support section in your dashboard and click New Ticket. Enter a clear subject, describe your problem in detail, select the priority (Low, Medium, High), and submit. Once submitted, the ticket will appear in your Ticket List." },
        { question: "How do I check the status of my ticket?", answer: "Each ticket shows a status: Open, In Progress, or Resolved. Open tickets are waiting for admin response, In Progress means the admin is working on it, and Resolved indicates the issue has been addressed. You can track status in real-time inside your dashboard." },
        { question: "How long does it take to get a response from support?", answer: "Response times vary depending on ticket priority and issue complexity. High-priority tickets are usually responded to faster. On average, most tickets are addressed within 24-48 hours." },
        { question: "Can I reply to a ticket after admin responds?", answer: "Yes. When admin replies, you can open the ticket and add a message to provide extra details or confirm resolution. This keeps the conversation in one place and ensures your problem is fully resolved." },
        { question: "What information should I include in a ticket?", answer: "Include your account details, market type, broker connected, wallet issues, trade ID, or strategy name depending on the problem. Clear information helps support resolve the issue faster." },
        { question: "What are ticket priority levels?", answer: "Tickets can be marked Low, Medium, or High. Low is for minor issues, Medium for problems affecting functionality, and High for urgent issues like trade failures, wallet deductions, or API disconnections." },
        { question: "Why hasn't my ticket been responded to yet?", answer: "Delays may occur due to high ticket volume, incomplete information, or complex issues requiring investigation. You can follow up by replying to the ticket or checking its priority status." },
        { question: "Can admin close a ticket without my confirmation?", answer: "Yes. Admin can mark tickets as Resolved after addressing the issue. You can reopen the ticket if the problem persists, ensuring it is fully resolved before closure." },
        { question: "Can I delete a support ticket?", answer: "Users cannot delete tickets themselves, but admin can remove tickets if they are duplicates or irrelevant. All actions are recorded for transparency and auditing." },
        { question: "What happens if I forget to reply to a ticket?", answer: "If you don't reply, the ticket will remain in Open or In Progress status. Admin may follow up, but unresolved issues may delay resolution. Always respond promptly to avoid delays." },
        { question: "Can tickets be escalated if unresolved?", answer: "Yes. If your issue is not resolved within a reasonable time, you can escalate by contacting support again or marking the ticket as urgent. Escalation ensures priority handling." },
        { question: "Do I get notifications for ticket updates?", answer: "Yes. The platform sends real-time notifications whenever your ticket status changes or admin replies. You can also view updates by checking your dashboard regularly." },
        { question: "Can I track multiple tickets at once?", answer: "Yes. All your tickets appear in the Ticket List, showing status, priority, subject, and date. You can filter tickets by Open, In Progress, or Resolved to manage them efficiently." },
        { question: "What happens if a support ticket is incorrectly resolved?", answer: "You can reopen the ticket and provide more details. Admin will review and work on the problem until it is correctly resolved." },
        { question: "Can admin see my previous tickets?", answer: "Yes. Admin can access full ticket history for troubleshooting, support quality checks, and auditing purposes. This ensures transparency and faster problem resolution." },
        { question: "Can I raise a ticket for wallet or payment issues?", answer: "Yes. Any wallet, payment, or subscription problem can be raised as a support ticket. Include transaction details or screenshots for faster resolution." },
        { question: "Can I raise a ticket for trade or strategy issues?", answer: "Absolutely. If trades fail, strategies don't execute, or copy trading misbehaves, raise a support ticket with relevant trade ID, strategy name, and market type." },
        { question: "Can tickets be used for feedback or suggestions?", answer: "Yes. Tickets are not only for issues but can also be used to submit feature requests, feedback, or suggestions. Admin reviews all feedback to improve the platform." },
        { question: "What should I do if the ticket system itself fails?", answer: "If you cannot access the ticket system, try refreshing the page or using a different browser. If the issue persists, contact admin via alternate contact provided in the dashboard." }
      ]
    },
    {
      category: "Advanced & Miscellaneous",
      items: [
        { question: "How do I update my broker API connection?", answer: "To update your broker API, go to Account Settings → API Integrations, select your broker, and enter the new API key and secret. Always ensure credentials are correct and verified to avoid trade failures." },
        { question: "What happens if my broker API key expires?", answer: "If your API key expires or becomes invalid, automated strategies and copy trading will stop. Update your API immediately to resume trading without interruption." },
        { question: "Can I test strategies before live trading?", answer: "Yes. Admin can enable paper mode in the platform. This allows strategies to run in simulated environments with fake funds so users can evaluate performance safely." },
        { question: "How do platform updates affect my account?", answer: "Platform updates improve features, security, and performance. Updates do not affect your trades, wallet balance, or strategies, but sometimes a refresh or logout/login is recommended." },
        { question: "How is system maintenance scheduled?", answer: "Scheduled maintenance is announced in advance via dashboard notifications or emails. Maintenance may temporarily pause trading features to ensure system stability and security." },
        { question: "How do I report a bug or technical issue?", answer: "Use the Contact Support ticket system and mark it as High Priority. Include a detailed description, screenshots, and steps to reproduce the issue." },
        { question: "How do I update my subscription plan automatically?", answer: "Some plans support auto-renewal. Enable it in Plan Info → Billing Settings. Ensure your wallet has sufficient balance for automatic renewal to avoid interruption." },
        { question: "Can I pause a subscription plan temporarily?", answer: "Depending on plan policy, admin may allow temporary pause of subscriptions. During pause, strategy execution and copy trading may stop until resumed." },
        { question: "What happens if a user violates platform policies?", answer: "Admin can warn, suspend, or delete accounts based on violations such as misuse, fraud, or policy breach. All actions are logged to maintain transparency and platform safety." },
        { question: "How does Uptrender ensure fair trading in the marketplace?", answer: "All strategies are monitored for performance consistency, and admin can review or remove strategies that violate rules. Copy trading fees and trade executions are transparent." },
        { question: "How do I recover my account if I lose access?", answer: "Use the Forgot Password option or contact support with verified ID/email. Admin will verify your details and restore access securely." },
        { question: "How do I track my investment across multiple markets?", answer: "The dashboard and trade panel consolidate all trades, strategies, and copy trading activity. Users can see overall profit/loss and performance per market in one place." },
        { question: "Are all features available for mobile users?", answer: "Yes. The platform is responsive and works on mobile browsers. Some complex analytics may be easier to view on desktop, but all core functions are fully accessible." },
        { question: "How are taxes handled on profits or trading fees?", answer: "Uptrender provides transaction and trade history for user tax reporting, but users are responsible for local tax compliance. Admin may provide summaries for easier filing." },
        { question: "How do I update my KYC or verification details?", answer: "Upload updated documents via Account Settings → Verification or contact support. Admin will review and approve your verification to maintain compliance." },
        { question: "How does the platform monitor suspicious activity?", answer: "Admin dashboard shows unusual login attempts, abnormal trading patterns, and multiple account activity. Admin can restrict access or request verification if needed." },
        { question: "How do I suggest a new feature for the platform?", answer: "Use Contact Support → Feedback Ticket. Admin reviews suggestions and may implement popular requests in future updates." },
        { question: "How does Uptrender handle market downtime or exchange issues?", answer: "If the exchange or broker is down, trades will not execute until service resumes. Strategies and copy trading pause automatically and resume once the market is live." }
      ]
    },
    {
      category: "User Dashboard & Overview",
      items: [
        { question: "What is the User Dashboard in Uptrender?", answer: "The User Dashboard is your personal trading control panel where you can monitor all your trading activity in one place. It gives you a clear overview of your wallet balance, profit and loss, active trades, closed trades, and strategy performance across Indian stocks, Forex, and Crypto markets." },
        { question: "Why is my wallet balance always visible on the dashboard?", answer: "Your wallet balance is shown at the top so you can always know how much money is available for trading, strategy subscriptions, and fees. This helps you avoid failed trades due to low balance and makes financial planning easier." },
        { question: "What does P&L (Profit and Loss) mean on the dashboard?", answer: "P&L shows how much profit or loss you have made from your trades. It includes gains or losses from open positions and closed trades. A positive number means profit, and a negative number means loss." },
        { question: "Why is my P&L showing negative even when some trades are profitable?", answer: "Your total P&L combines all trades together. If losses from some trades are higher than profits from others, the overall P&L will show negative. Open trades may also temporarily affect P&L until they are closed." },
        { question: "What are active positions?", answer: "Active positions are trades that are currently running in the market and not yet closed. These positions continue to fluctuate based on market prices until you exit them manually or they close automatically." },
        { question: "How do I close an active position?", answer: "You can close any active position by clicking the Exit button next to that trade. Once exited, the trade moves to the closed positions section and the final profit or loss is calculated." },
        { question: "How do I add Stop Loss (SL) or Take Profit (TP)?", answer: "You can add Stop Loss or Take Profit to an active trade by clicking on the trade and entering your desired price levels. SL helps limit losses, and TP helps lock profits automatically." },
        { question: "What happens if I exit a position manually?", answer: "When you exit manually, the trade closes immediately at the current market price. The final profit or loss is updated in your dashboard and wallet balance." },
        { question: "What is the difference between active positions and closed positions?", answer: "Active positions are still running in the market, while closed positions are trades that have already ended. Closed positions show final results and cannot be modified." },
        { question: "Why can't I see some trades in active positions?", answer: "Trades that are already closed will no longer appear in active positions. They are moved automatically to the closed positions section for record keeping." },
        { question: "How does segment filtering work?", answer: "Segment filters allow you to view trades from specific markets like Indian stocks, Forex, or Crypto. This helps you analyze each market separately and avoid confusion." },
        { question: "Why can't I see my Forex or Crypto trades?", answer: "If a filter is applied, trades from other segments may be hidden. Select All Segments to see all your trades together." },
        { question: "What is Strategy Performance tracking?", answer: "Strategy Performance shows how your subscribed or created strategies are performing over time. It helps you understand which strategies are profitable and which need improvement." },
        { question: "How is monthly strategy performance calculated?", answer: "Monthly performance is calculated based on the total profit and loss generated by a strategy during that month. It reflects real market execution results." },
        { question: "Is dashboard data real-time?", answer: "Most dashboard data updates in near real-time. However, small delays may occur due to broker API responses or network conditions." },
        { question: "Why does dashboard data sometimes take time to refresh?", answer: "Data refresh depends on broker APIs and system load. Refreshing the page or waiting a few seconds usually resolves this." },
        { question: "What should I do if dashboard numbers look incorrect?", answer: "If numbers look incorrect, first refresh the page. If the issue continues, check order history or raise a support ticket for verification." }
      ]
    },
    {
      category: "Strategy Info & Trading Mode",
      items: [
        { question: "What is the Strategy Info section?", answer: "The Strategy Info section shows all strategies you are using or have created. It helps you manage subscriptions, track performance, and control execution modes easily." },
        { question: "What is the difference between Subscribed Strategies and My Strategies?", answer: "Subscribed Strategies are strategies you follow from the marketplace. My Strategies are strategies you created yourself for personal use or sharing." },
        { question: "How do I know if a strategy is active?", answer: "An active strategy is marked clearly in the strategy list. Active strategies can execute trades, while inactive ones remain paused." },
        { question: "What is the expiry date of a strategy?", answer: "The expiry date shows how long your subscription to a strategy is valid. After expiry, the strategy stops trading unless renewed." },
        { question: "What happens when a strategy expires?", answer: "When a strategy expires, it automatically stops executing trades. You must renew the subscription to continue using it." },
        { question: "Can I pause a strategy temporarily?", answer: "Yes, you can pause a strategy anytime. Pausing stops new trades but does not affect already closed trades." },
        { question: "What happens when I delete a strategy?", answer: "Deleting a strategy removes it completely from your account. Once deleted, it cannot be recovered." },
        { question: "What is Paper Trading mode?", answer: "Paper Trading allows you to test strategies using virtual money instead of real funds. It helps beginners practice without financial risk." },
        { question: "Is paper trading risk-free?", answer: "Yes, paper trading involves no real money. However, performance may differ slightly from live trading due to real execution factors." },
        { question: "How accurate is paper trading?", answer: "Paper trading uses real market prices, but it does not include slippage or broker execution delays. It is ideal for learning and testing." },
        { question: "What is Live Trading mode?", answer: "Live Trading executes real trades using your actual wallet balance and broker account. Profits and losses are real." },
        { question: "When should I switch to live trading?", answer: "You should switch to live trading only when you understand the strategy, are comfortable with risk, and have tested it using paper trading." },
        { question: "Can I switch trading modes anytime?", answer: "Yes, you can switch between paper and live trading modes before execution, depending on strategy settings." },
        { question: "Why is my strategy not executing trades?", answer: "Common reasons include inactive strategy, expired subscription, disconnected API, insufficient wallet balance, or market being closed." },
        { question: "Does paper trading affect my wallet balance?", answer: "No, paper trading does not use your wallet balance and does not deduct any fees." },
        { question: "Can beginners safely use strategies?", answer: "Yes, beginners can safely use strategies by starting with paper trading and low-risk strategies before moving to live trading." },
        { question: "Are strategy results guaranteed?", answer: "No trading strategy guarantees profits. Past performance helps analysis, but market conditions can change at any time." }
      ]
    },
    {
      category: "API Management & Broker Connection",
      items: [
        { question: "What is API Management in Uptrender?", answer: "API Management is the section where you connect your trading broker accounts to Uptrender. This connection allows strategies and manual trades to execute automatically in your broker account without manual intervention." },
        { question: "Why do I need to connect my broker API?", answer: "Broker API connection is required so that Uptrender can place trades on your behalf. Without an API connection, live trading, automated strategies, and copy trading will not work." },
        { question: "Which markets support API connections?", answer: "Uptrender supports API connections for Indian stock brokers, Forex brokers, and Crypto exchanges, allowing multi-market trading from a single platform." },
        { question: "Can I connect multiple broker APIs at the same time?", answer: "Yes, you can connect multiple broker APIs across different markets. This allows you to trade Indian stocks, Forex, and Crypto simultaneously using separate brokers." },
        { question: "How do I add a new broker API?", answer: "Click on + New API, select your market segment (Indian, Forex, or Crypto), choose your broker, and enter the required API credentials. Once verified, the connection becomes active." },
        { question: "What details are required to connect a broker API?", answer: "Typically, you need API Key, Secret Key, Client ID, or Token depending on the broker. These credentials are provided by your broker's platform." },
        { question: "Is it safe to share my broker API details?", answer: "Yes. Uptrender uses secure encryption and does not store login passwords. API keys only allow trade execution and cannot withdraw funds from your broker account." },
        { question: "What does an active API connection mean?", answer: "An active API means your broker is successfully connected and ready to execute trades. Strategies and manual orders can now work without issues." },
        { question: "What does an inactive API connection mean?", answer: "Inactive API means the connection is broken due to expired keys, incorrect credentials, or broker issues. Trades will not execute until it is fixed." },
        { question: "What happens if my broker API disconnects?", answer: "If the API disconnects, strategies pause automatically to prevent failed trades. You must reconnect the API to resume trading." },
        { question: "Can trades execute without API connection?", answer: "No. Live trading requires a valid broker API connection. Without it, only paper trading can work." },
        { question: "Are API connection charges deducted from wallet?", answer: "Yes. A small fee may be deducted from your wallet when connecting or maintaining broker APIs, depending on your subscription plan." },
        { question: "How do I update or replace an API connection?", answer: "You can edit existing API details or delete the old connection and add a new one from the API Management section." },
        { question: "Why is my strategy not trading even after API connection?", answer: "This can happen due to insufficient wallet balance, inactive strategy, expired subscription, market closure, or broker-side rejection." },
        { question: "Can one API be used for multiple strategies?", answer: "Yes. A single broker API can be used across multiple strategies as long as your subscription plan supports it." },
        { question: "What should I do if my broker rejects orders?", answer: "Check order logs for rejection reasons such as insufficient margin, market closure, or symbol mismatch. You may also contact your broker." },
        { question: "How do I know my API connection is working properly?", answer: "You can verify API health in the API dashboard and by checking successful order execution logs." }
      ]
    },
    {
      category: "Order History & Trade Records",
      items: [
        { question: "What is Order History in Uptrender?", answer: "Order History is your complete record of all trades placed through the platform, including executed, pending, and failed orders." },
        { question: "What is the difference between Orders and Positions?", answer: "Orders show trade requests placed with the broker, while Positions show currently active trades that are still open in the market." },
        { question: "Why are some orders marked as failed?", answer: "Orders fail due to reasons like insufficient balance, invalid symbol, API issues, market closure, or broker rejection." },
        { question: "What does a pending order mean?", answer: "Pending orders are placed but not yet executed due to market conditions, price limits, or broker processing delay." },
        { question: "How is total P&L calculated in order history?", answer: "Total P&L is calculated by adding profits and losses from all completed trades during the selected time period." },
        { question: "Can I filter orders by date range?", answer: "Yes. You can filter orders by Today, This Week, Month, Year, or select a custom date range for detailed analysis." },
        { question: "How do I search trades by order ID or symbol?", answer: "Use the search bar at the top of the Order History page to quickly find specific trades using order ID or trading symbol." },
        { question: "Can I filter orders by market and broker?", answer: "Yes. Filters allow you to view trades by Indian, Forex, or Crypto markets and by specific broker connections." },
        { question: "Why does P&L in order history differ from dashboard P&L?", answer: "Dashboard P&L may include open positions, while order history P&L usually reflects closed trades only." },
        { question: "Can I export my order history?", answer: "Yes. You can export order history in downloadable format for analysis, record keeping, or tax purposes." },
        { question: "What format is the exported order history file?", answer: "Exported files are usually available in Excel or CSV format, making them easy to open and analyze." },
        { question: "How far back does order history go?", answer: "Order history stores long-term trade data depending on platform policy, ensuring transparency and traceability." },
        { question: "Can deleted trades be recovered?", answer: "Deleted trades are permanently removed and cannot be recovered. However, admin-level logs may still retain records." },
        { question: "Is order history data real-time?", answer: "Order history updates almost instantly after order execution, with minor delays depending on broker responses." },
        { question: "What should I do if trade data looks incorrect?", answer: "First refresh the page. If the issue persists, compare with broker statements or raise a support ticket for verification." }
      ]
    },
    {
      category: "Order Log & Execution Details",
      items: [
        { question: "What is the Order Log?", answer: "Order Log displays real-time execution responses received from your broker, including acceptance, rejection, and execution messages." },
        { question: "Why is Order Log important?", answer: "Order Log helps you understand exactly what happened during order execution, making it useful for debugging and troubleshooting." },
        { question: "What is the difference between Order Log and Order History?", answer: "Order Log shows technical execution details, while Order History shows finalized trade records and P&L summaries." },
        { question: "What does a rejected order mean?", answer: "Rejected orders are refused by the broker due to margin shortage, invalid price, closed market, or incorrect symbol." },
        { question: "What does pending status in order log indicate?", answer: "Pending status means the broker has received the order but has not executed it yet." },
        { question: "Can I see real-time broker responses?", answer: "Yes. Order Log shows live responses from broker APIs, including timestamps and execution messages." },
        { question: "How do I search order logs?", answer: "You can search by symbol, order ID, or filter by execution status such as executed, pending, or rejected." },
        { question: "What information is available in order logs?", answer: "Logs include order ID, symbol, execution time, broker response message, and execution status." },
        { question: "Can admin access my order logs?", answer: "Yes. Admin can view logs for troubleshooting, compliance, and support resolution purposes." },
        { question: "How do order logs help in resolving trade issues?", answer: "Order logs show exact rejection or execution reasons, allowing faster issue diagnosis and resolution." },
        { question: "Can I export order logs?", answer: "Export availability depends on your plan, but logs are always viewable within the platform." },
        { question: "Do order logs affect wallet balance?", answer: "No. Order logs are informational only and do not directly impact wallet deductions." },
        { question: "What should I do after repeated order rejections?", answer: "Review rejection reasons, check wallet balance, confirm API connection, and contact support if the issue continues." }
      ]
    },
    {
      category: "Strategy Marketplace",
      items: [
        { question: "What is the Strategy Marketplace in Uptrender?", answer: "The Strategy Marketplace is a dedicated section where users can discover, analyze, and subscribe to ready-made trading strategies designed by experienced traders, users, or admins. They work across Indian, Forex, and Crypto markets." },
        { question: "Who can create strategies in the marketplace?", answer: "Strategies can be created by platform admins or experienced users. Admin-created strategies are usually more curated, while user-created strategies offer variety and innovation." },
        { question: "What is the difference between public and user strategies?", answer: "Public strategies are available for anyone to subscribe to, while user strategies are created by individual traders and may have specific subscription rules or limitations." },
        { question: "How do I filter strategies by market segment?", answer: "You can use the filter panel to select Indian stock market, Forex, or Crypto strategies. This helps you focus only on strategies relevant to your trading preference." },
        { question: "What does strategy performance percentage mean?", answer: "Performance percentage shows how much profit or loss a strategy has generated over time. It helps users evaluate historical results, but it does not guarantee future profits." },
        { question: "Is past strategy performance guaranteed?", answer: "No. Past performance is for reference only. Market conditions change, and profits are never guaranteed in trading." },
        { question: "What does capital required mean in a strategy?", answer: "Capital required indicates the minimum wallet balance needed to run the strategy effectively without trade failures." },
        { question: "What are per-trade fees?", answer: "Per-trade fees are small charges deducted from your wallet each time a strategy executes a trade. These fees help maintain platform operations." },
        { question: "Why are some strategies free and others paid?", answer: "Free strategies help users get started, while paid strategies usually involve advanced logic, higher accuracy, or expert management." },
        { question: "How do I subscribe to a strategy?", answer: "Click the Subscribe button on a strategy card. Once subscribed, the strategy moves to your Strategy Info section and becomes ready for execution." },
        { question: "What happens after I subscribe to a strategy?", answer: "After subscribing, you can choose paper trading or live trading mode and start executing trades immediately." },
        { question: "Can I unsubscribe from a strategy?", answer: "Yes. You can unsubscribe anytime, but already deducted subscription fees may not be refundable." },
        { question: "Can I use multiple strategies at the same time?", answer: "Yes. You can run multiple strategies simultaneously, depending on your subscription plan and wallet balance." },
        { question: "Why is a strategy marked inactive?", answer: "A strategy may be inactive due to expiry, paused status, insufficient wallet balance, or disconnected broker API." },
        { question: "How often do marketplace strategies trade?", answer: "Trading frequency depends on strategy logic. Some trade daily, while others trade occasionally based on market conditions." },
        { question: "Are marketplace strategies beginner-friendly?", answer: "Yes. Many strategies are designed for beginners, especially when used with paper trading before live execution." }
      ]
    },
    {
      category: "Plan Info & Wallet",
      items: [
        { question: "What is Plan Info in Uptrender?", answer: "Plan Info is your billing and subscription management section where you manage wallet balance, plans, payments, and transaction history." },
        { question: "How does the wallet system work?", answer: "Your wallet holds funds used for subscriptions, broker API connections, strategy fees, and per-trade charges. All deductions happen automatically." },
        { question: "Why is wallet balance deducted automatically?", answer: "Automatic deduction ensures uninterrupted trading, strategy execution, and service access without manual payments each time." },
        { question: "When is wallet balance deducted?", answer: "Wallet balance is deducted when you subscribe to a strategy, place trades, connect APIs, or use copy trading services." },
        { question: "How do I add funds to my wallet?", answer: "Click the Add Funds button, choose your payment method (Razorpay or UPI), and complete the payment securely." },
        { question: "What payment methods are supported?", answer: "Uptrender supports Razorpay, UPI, and other configured gateways. Availability depends on platform settings." },
        { question: "Can I upgrade my subscription plan?", answer: "Yes. You can upgrade anytime to access more features, higher limits, and advanced tools." },
        { question: "What happens if my wallet balance becomes zero?", answer: "Strategies and trades may stop until you add funds. This prevents failed trades and negative balances." },
        { question: "Can I cancel my subscription plan?", answer: "Yes. You can cancel your plan anytime, but access may continue until the current billing period ends." },
        { question: "Is wallet balance refundable?", answer: "Wallet balances are usually non-refundable once credited. Please check platform policy for exceptions." },
        { question: "Where can I see my transaction history?", answer: "You can view complete transaction history in the Past History section under Plan Info." },
        { question: "Are wallet transactions secure?", answer: "Yes. All transactions are encrypted and processed through secure payment gateways." },
        { question: "What should I do if a payment fails?", answer: "Retry the payment or use another method. If the issue continues, raise a support ticket." }
      ]
    },
    {
      category: "Copy Trading",
      items: [
        { question: "What is Copy Trading?", answer: "Copy Trading allows you to automatically copy trades from expert traders (masters) into your own account." },
        { question: "Who is a master trader?", answer: "A master trader is an experienced trader whose trades are followed by others through copy trading." },
        { question: "Who is a copy account?", answer: "A copy account belongs to a follower who copies trades from a master trader automatically." },
        { question: "How does copy trading work?", answer: "Once linked, trades placed by the master are automatically executed in the follower's account based on predefined rules." },
        { question: "Is copy trading safe for beginners?", answer: "Yes. It helps beginners learn by following experienced traders, but risk management is still important." },
        { question: "Can I stop copy trading anytime?", answer: "Yes. You can unlink your account from a master trader at any time." },
        { question: "What are trading groups?", answer: "Trading groups define relationships between master and follower accounts in copy trading." },
        { question: "Can I follow multiple master traders?", answer: "Yes. You can follow multiple masters if your plan and wallet balance allow it." },
        { question: "Are copy trading fees deducted from wallet?", answer: "Yes. Fees related to copy trading are deducted automatically from your wallet." },
        { question: "What happens if the master trader stops trading?", answer: "If the master stops, no new trades are copied until activity resumes." },
        { question: "Can I become a master trader?", answer: "Yes. Experienced users can apply to become master traders and earn by sharing strategies." },
        { question: "Why are trades not copying to my account?", answer: "Common reasons include inactive API, insufficient balance, paused copy trading, or master inactivity." }
      ]
    },
    {
      category: "Support Center",
      items: [
        { question: "What is the Support Center?", answer: "The Support Center is where you can raise queries, report issues, and communicate directly with platform support." },
        { question: "How do I create a support ticket?", answer: "Click New Ticket, enter the subject, explain the issue clearly, set priority, and submit." },
        { question: "What information should I include in a support ticket?", answer: "Include order ID, strategy name, screenshots, or error messages to help resolve the issue faster." },
        { question: "What do ticket statuses mean?", answer: "Open means waiting for response, In Progress means being worked on, and Resolved means the issue is addressed." },
        { question: "How long does support take to respond?", answer: "Most tickets are answered within 24-48 hours, depending on priority and complexity." },
        { question: "Can I reply to admin messages?", answer: "Yes. You can continue the conversation until your issue is fully resolved." },
        { question: "Can I reopen a resolved ticket?", answer: "Yes. If the issue persists, you can reopen the ticket for further assistance." },
        { question: "Do I get notifications for ticket updates?", answer: "Yes. You will receive alerts when admin replies or updates your ticket status." },
        { question: "Can I raise tickets for wallet or trade issues?", answer: "Yes. All wallet, strategy, API, or trade-related problems can be raised via support tickets." },
        { question: "Is my support data confidential?", answer: "Yes. All support tickets and conversations are private and securely stored." },
        { question: "Is support available 24/7?", answer: "Support availability depends on platform policy, but tickets can be raised anytime." }
      ]
    },
    {
      category: "Additional User FAQs",
      items: [
        { question: "What happens if I log out while trades are running?", answer: "If you log out, your active trades and strategies continue running in the background. Logging out does not stop trading. You can safely log back in anytime to check updates." },
        { question: "Will my trades stop if my internet disconnects?", answer: "No. Once a trade or strategy is placed, it runs through the broker API. Internet issues on your device will not affect already placed trades." },
        { question: "What happens if my device shuts down during trading?", answer: "Your device shutdown does not impact active trades. Trades are managed on the server and broker side, not on your personal device." },
        { question: "Can I trade outside market hours?", answer: "Live trades can only execute during market hours. If a strategy triggers outside market hours, it will wait or fail based on broker rules." },
        { question: "Why does a trade execute at a different price than expected?", answer: "This can happen due to market volatility, slippage, or liquidity issues. Live markets do not always guarantee exact prices." },
        { question: "What is slippage in trading?", answer: "Slippage is the difference between expected price and actual execution price. It usually happens in fast-moving or low-liquidity markets." },
        { question: "Why does strategy performance differ between users?", answer: "Performance can vary due to broker differences, execution speed, slippage, capital size, and market timing." },
        { question: "Can I change lot size after a strategy starts?", answer: "Some strategies allow lot size adjustment. Changes apply only to future trades, not already open positions." },
        { question: "What happens if my wallet has partial balance?", answer: "If wallet balance is insufficient for fees or margin, trades may fail or strategies may pause automatically to prevent losses." },
        { question: "Why does the platform block some actions automatically?", answer: "The platform blocks actions like over-trading or insufficient balance to protect users from unintended losses and system errors." },
        { question: "Can I accidentally lose more than my wallet balance?", answer: "No. The platform prevents negative wallet balances. Trades are blocked if required balance is not available." },
        { question: "Does Uptrender give trading advice?", answer: "No. Uptrender is a technology platform. All trading decisions are user-driven or strategy-based. Risk remains with the user." },
        { question: "Are strategies manually controlled or fully automated?", answer: "Strategies are fully automated once started. However, users can pause, stop, or exit trades manually at any time." },
        { question: "How does Uptrender help beginners avoid losses?", answer: "Features like paper trading, stop-loss, copy trading, and wallet limits help beginners control risk and learn safely." },
        { question: "Can I use the same account on multiple devices?", answer: "Yes. You can log in from multiple devices, but simultaneous actions may override each other." },
        { question: "What happens if I log in from a new device?", answer: "You may be asked for verification for security reasons. This protects your account from unauthorized access." },
        { question: "How does Uptrender protect my account security?", answer: "The platform uses encrypted APIs, secure authentication, role-based access, and activity monitoring to protect users." },
        { question: "Can someone place trades without my permission?", answer: "No. Trades require active login, strategy activation, or copy trading consent. Unauthorized activity is blocked." },
        { question: "What happens if I make a mistake in live trading?", answer: "Live trades execute instantly and cannot be reversed. Always double-check before placing live trades." },
        { question: "Can I undo a trade?", answer: "No. Once executed, trades cannot be undone. You can only exit the position to limit loss or secure profit." },
        { question: "Why does the platform ask for confirmation before actions?", answer: "Confirmation popups prevent accidental trades, deletions, or subscription changes." },
        { question: "Can I temporarily stop all trading activity?", answer: "Yes. You can pause strategies, unlink copy trading, or log out to stop new trade execution." },
        { question: "Does Uptrender manipulate trade outcomes?", answer: "No. Uptrender does not interfere with market prices or trade execution. All executions happen via broker APIs." },
        { question: "How transparent is trade execution?", answer: "Every trade has a full execution trail including order logs, timestamps, and broker responses." },
        { question: "Can I verify trades with my broker statement?", answer: "Yes. All executed trades appear in your broker account and can be matched with platform records." },
        { question: "Is my trading data shared with other users?", answer: "No. User data, trades, and performance are private and never shared without permission." },
        { question: "What should I do before starting live trading?", answer: "Test strategies in paper trading, ensure wallet balance, confirm API connection, and understand risk." },
        { question: "How does Uptrender help reduce emotional trading?", answer: "Automation, predefined strategies, stop-loss rules, and copy trading reduce emotional decision-making." },
        { question: "Can I use Uptrender as a long-term trading tool?", answer: "Yes. It supports both short-term trading and long-term systematic strategies." },
        { question: "What makes Uptrender different from normal trading apps?", answer: "Uptrender combines automation, strategies, copy trading, multi-market access, and centralized control in one dashboard." },
        { question: "Who should NOT use automated trading?", answer: "Users who do not understand basic trading risk or expect guaranteed profits should avoid live automation." }
      ]
    }
  ];

  
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-title", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", force3D: true, delay: 0.2 });
      gsap.fromTo(".faq-subtitle", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", force3D: true, delay: 0.4 });
      gsap.fromTo(".faq-item", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", force3D: true, delay: 0.6, scrollTrigger: { trigger: ".faq-items", start: "top 80%", toggleActions: "play none none none" } });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      {/* Header */}
      

      {/* Hero Section */}
      <section ref={heroRef} style={{ paddingTop: "140px", paddingBottom: "100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="faq-container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <h1 className="faq-title" style={{ fontSize: "clamp(42px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "24px", opacity: 0, textAlign: "center" }}>
            Frequently Asked <span style={{ background: "linear-gradient(135deg, #00f0ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span><span style={{ color: "#00f0ff" }}>.</span>
          </h1>

          <p className="faq-subtitle" style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.65)", maxWidth: "600px", lineHeight: 1.7, opacity: 0, marginBottom: "64px", textAlign: "center", margin: "0 auto 64px" }}>
            Find answers to common questions about Uptrender, trading, accounts, and more.
          </p>

          <div className="faq-items" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="faq-item"
                style={{
                  opacity: 0,
                  background: "linear-gradient(135deg, rgba(0, 240, 255, 0.06), rgba(139, 92, 246, 0.06))",
                  border: `1px solid ${expandedFAQ === i ? "rgba(0, 240, 255, 0.4)" : "rgba(0, 240, 255, 0.15)"}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
              >
                <div style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#00f0ff", margin: 0 }}>
                    {item.question}
                  </h3>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2"
                    style={{
                      transform: expandedFAQ === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      flexShrink: 0,
                      marginLeft: "16px"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                {expandedFAQ === i && (
                  <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid rgba(0, 240, 255, 0.2)" }}>
                    <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.8, margin: 0 }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "64px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.65)", marginBottom: "24px" }}>
              Didn't find your answer?
            </p>
            <Link href="/contact" style={{ display: "inline-block", background: "linear-gradient(135deg, #00f0ff, #00b8d4)", color: "#0a0a0a", padding: "16px 40px", borderRadius: "12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", transition: "all 0.3s ease" }}>
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
