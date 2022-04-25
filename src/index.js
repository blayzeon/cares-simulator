/* CARES SIMULATOR */

/* Account Summary Page
    This page can do the following:
    * Popup that lets you select the account type if there are multiple types
    * Ability to create new accounts if one does not exist
    * Shows a "Contact Exceptions" popup that has facility info on it... (skip?)
    * Ability to switch between different account types: 
        * ""
        * Advance Pay
        * Direct Bill
        * Friends and Family
        * APOC
    * View/uodate the customer's BNA
    * View/add comments to the customer's account
    * View/update the customer's policies
    * Add deposits via a CC
    * Add/remove funds via adjustments
    * View the customer's balance
*/

/* Transactions Page
    This page can do the following:
    * Show transactions associated with an account within a searchable date range
    * Transaction data includes the following:
        * Date and time (ex: 1/27/2022 2:30:17 PM)
        * Type (ex: AdjustmentIncrease, ExpireFunds)
        * Added By (ex: kristine.carter, Breakage AMES AdvancePay)
        * Amount (ex: $552.01)
        * Balance (ex: $0.00)
        * Comment (ex: Transfer fund from account 8004838314)
    * Adjust page size (items shown on page)
    * Adjust which page you are on
*/

/* Refund Page 
    This page can do the following:
    * Allow user to select the refund type ("", Refund, Account Closure)
        * Refund has a table that includes refund, date, added by, amount, cc number, and comment.  No additional buttons.
        * Account closure displays the "Remaining Balance To Close Account: $0.00."
        * Account closure has a table of:
            * Use For Closure
            * Refund
            * Date (02/22/2022 02:38:47 PM)
            * Added By
            * Amount
            * CC Number (i) icon
            * Comment
        * Buttons include
            * No CC Refund
            * Check Refund
            * Save
            * Cancel
    * Allow user to click a button for No CC Refund (displays an alert, then a popup asking for additional info)
*/

/* Transaction Summary shows the following:
    * A table with the headers "", Deposit, Call Usage, Taxes, Fees, Funds xFer, 
    * Adj Increase, Adj Decrease, Withdrawal, Ret Check, Close Account, Exp Funds Chargeback
    * Below the "" column is Amount: and Count:
*/

/* CC Auths can do the following: 
    * Search CC transactions by Destination, Last 4 CC, First 4 + Last 4 CC, First 6 + Last 4 CC
    * There is a Search Text field, and a Start/End Date for filtering by date range
    * There is a Search and Export Excel button
    * It has the following info when searching by Destination
        * Calling System (ex: DSI-EMAIL-WEB, DSI-TRUSTDEPOSIT-IVR)
        * Date (ex: 4/8/2022 10:56:31 AM)
        * Status (ex: DECLINED, APPROVED)
        * Amount (ex: $1.00)
        * Code (32-character number string)
        * Order ID (11 character number/letter string)
        * Reject code (ex: 000, DENY, 64)
        * Vendor (ex: PaymenTech, Vantiv, ReD)
        * Transaction Type (ex: Payment, Void, Post-Auth)
    * When searching by First 6 + Last 4, it shows the following:
        * Calling System
        * Status
        * Destination
        * CC Number
        * Exp 
        * Amount
        * Auth code
        * Order ID
        * Add Date
        * Vendor
        * Transaction Type
*/

/* Call Records can do the following:
    * Has a note about downloading calls
    * Has a range to filter calls.  There is a show all button, a search button, and an export all button
    * Has pages of calls and you can pick how many calls are shown per page
    * Calls have the following data:
        * Play (download call)
        * Call Date
        * Sub ID
        * Orig
        * PIN
        * Duration
        * Bill Amt
        * Tax
        * Total Amt
        * Fees
        * Start Code
        * End Code
        * Call Type
        * Rate Type
        * Phone Type
        * Add Req
*/

/* TAG Comments has a date range search but will yield "No record(s) found" */

/* Statements will show "Click on the invoice date to view customer invoice." and in red text "No invoice(s) found for this customer." */

/* Auto Reload can do the following:
    * Allow the customer to turn off auto-reload (a rep cannot turn it on)
    * If the customer does not have auto-reload enabled, it will say "The current destination does not have auto reload configured." in blue at the top
    * Auto reload has the following table heads:
        * Reload Type
        * Enabled
        * LB Amount
        * Active Date
        * Expiration Date
        * Cancelled Date
        * Amount
        * CC Number
        * Source
*/

/* Alerts can do the following: 
    * Two Legend forms, one for Low Balance and No Account IVR Alert and one for Low Balance Text Alert
    * The IVR alert allows you to opt in or out
    * Low balance text alert has a status checkbox
*/