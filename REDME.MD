# 🚀 SauceDemo Playwright Automation Project

This project contains automated end-to-end tests for the [SauceDemo](https://www.saucedemo.com) website, built using Playwright and JavaScript according to the question of Ostad

#### The questions:
--------------------
You are asking for automation tests on the (httos://www.saucedemo,com) site. 
Q1|[Mark 20] Try login with locked_out_user and verify the error message. 

Q2|[Mark 50] Log in with standard_user. Then, from the hamburger menu, reset the 
App State. Add any three items to the cart. Navigate to the final checkout page and 
verify the product name and total price. Finish the purchase joumey and verify the 
successful order message. Then, reset the App State again and log out. 

Q3|[Mark 30] Login with performance glitch User and reset the App State. Then filter 
by name (Z to A) and select the first product into the cart. Then navigate up to the final 
checkout page and verify all the products’ names and the total price. Then finish the 
purchase journey and verify the successful order message. Then, reset the App State 
again and log out. 

NOTE: 

Upload your code to the GitHub public repository and share the repository URL. 
(Your assessment will not be accepted without the GitHub repository.) 

All three test scenarios should be run separately and also altogether in a 
sequential way. 

It should be able to generate the allure report after every execution. 

You can use any of your preferred languages and automation frameworks. But 
add a readme file for the execution process.

--------------------

It includes tests for various user flows (locked-out user, standard user, and performance glitch user) and generates interactive test reports using Allure.

---

## 🛠️ Setup

Before running the tests, you must install the project's dependencies.

1.  **Install Node.js** (if you don't have it):
    Download the LTS version from the [official Node.js website](https://nodejs.org/).

2.  **Install Project Dependencies:**
    Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```

3.  **Install Playwright Browsers:**
    This command downloads the browser binaries (Chromium, Firefox, etc.) that Playwright uses.
    ```bash
    npx playwright install
    ```
4.  **Install java jdk from Oracle**
    
    ```https://www.oracle.com/java/technologies/downloads/#jdk25-windows
    ```

---

## 🚀 Running the Tests

You can run all tests sequentially or run a single, specific test file.

### 1. Run All Tests in Order (Sequential)


```bash
npx playwright test --workers=1

```
------


#### To watch the tests run in a live browser window, use the --headed flag:

```bash

npx playwright test --workers=1 --headed
```
------

## 2. Run a Single Test File
To run only one specific test file, just provide its name.

```bash

# Example: Run only the standard user test
npx playwright test b.standard.user.flow.spec.js
```

--------------

## 📊 Viewing the Allure Report
Follow these steps to generate and view a fresh, clean Allure report.

## Step 1: Clean Old Report Data (Recommended)
If there is old data and you want to remove them then just delete the 2 folders -
allure-results, 
allure-report


## 1. Generate the report
```
npx allure generate allure-results -o allure-report
```
allure-results and allure-report in the command is folder name.

## 2. Open the report
```
npx allure open
````

##Done