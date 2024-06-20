#! /usr/bin/env node
// Import all the packages in this program.
import inquirer from "inquirer";
import chalk from "chalk";
import chalkanimation from "chalk-animation";
// Chalk animation
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
// Making a neontitle for program
async function start() {
    let neonTitle = chalkanimation.rainbow("\n *Welcome to our Bank program* \n");
    await sleep();
    neonTitle.stop();
}
// calling the function
await start();
// Bank account class
class BankAccount {
    accountNumber;
    userBalance;
    constructor(accountNumber, userBalance) {
        this.accountNumber = accountNumber;
        this.userBalance = userBalance;
    }
    // Debit money
    withdraw(amount) {
        if (this.userBalance >= amount) {
            this.userBalance -= amount;
            console.log(chalk.cyan.bold(`Withdrawal of $${amount} successfully. Remaining balance is $${this.userBalance}`));
        }
        else {
            console.log(chalk.red.italic("Insufficient balance."));
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charge if more than $100 deposited.
        }
        this.userBalance += amount;
        console.log(chalk.blue.bold(`Deposite of $${amount} successfully. Current balance: $${this.userBalance}`));
    }
    // check balance
    checkBalance() {
        console.log(chalk.cyanBright.italic(`Current balance: $${this.userBalance}`));
    }
}
// Customer class
class customer {
    firstName;
    lastName;
    mobilenumber;
    gender;
    age;
    account;
    constructor(firstName, lastName, mobilenumber, gender, age, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobilenumber = mobilenumber;
        this.gender = gender;
        this.age = age;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500), // accountnumber:1001 , balance: 500
    new BankAccount(1002, 300), // accountnumber:1002 , balance: 300
    new BankAccount(1003, 1000) // accountnumber:1003 , balance: 1000
];
const customers = [
    new customer("Sajid", "Khan", 3342123334, "male", 27, accounts[0]),
    new customer("Nasreen", "jameel", 3312223334, "female", 30, accounts[1]),
    new customer("Hamza", "syed", 3412223334, "male", 25, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountnumber",
                type: "number",
                message: "Enter your account number:"
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountnumber);
        if (customer) {
            console.log(chalk.redBright.bold(`Welcome, ${customer.firstName} ${customer.lastName}! \n `));
            const options = await inquirer.prompt([
                {
                    name: "answer",
                    type: "list",
                    message: "Select an operations!",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (options.answer) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount of withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting the bank program...");
                    console.log("Thank you for using our services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number!");
            console.log("Please enter the valid account number! ");
        }
    } while (true);
}
service();
