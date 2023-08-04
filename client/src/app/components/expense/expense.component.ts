import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  regForm: FormGroup;
  expenseForm: FormGroup;
  
  constructor(private http:HttpClient,private router:Router){
    this.regForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      monthNumber: new FormControl(null, Validators.required),
      monthYear: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      
    })

    const token = localStorage.getItem("jwtToken")
    if (!token) {
      window.alert("You can't Access this! because your not an loggedin user!")
      this.router.navigate(['/login'])
    }

    this.expenseForm = new FormGroup({
      expenseAmount: new FormControl(null, Validators.required),
      expenseCategory: new FormControl(null, Validators.required),
      expenseMonthNumber: new FormControl(null, Validators.required),
      expenseMonthYear: new FormControl(null, Validators.required),
      expenseDate: new FormControl(null, Validators.required)
    })
  }

  addIncome(details: { amount: string, category: string, monthNumber: string, monthYear: string, date: Date }) {
    const userId = localStorage.getItem("userId")
    console.log(userId)
    const data = {
      userId: userId,
      monthYear: details.monthYear,
      monthNumber: details.monthNumber,
      tables: [{
        tableName: "INCOME",
        columns: ["Date", "Category", "Amount"],
        rows: [{
          date: details.date,
          name: details.category,
          amount: details.amount
        }]
      }]
    };
  
    const API = 'http://localhost:5100/expenses';
    this.http.post(API, data).subscribe(
      (response) => {
        alert('Income Created Successfully');
        this.regForm.reset()
      },
      (error) => {
        console.error('Failed to save income:', error);
      }
    );
  }
  
  
  addExpense(details: { expenseAmount: string, expenseCategory: string, expenseMonthNumber: number, expenseMonthYear: string, expenseDate: Date }) {
    const userId = localStorage.getItem("userId")
    console.log(userId)
    const data = {
      userId: userId,
      monthYear: details.expenseMonthYear,
      monthNumber: details.expenseMonthNumber,
      tables: [{
        tableName: "EXPENSE",
        columns: ["Date", "Category", "Amount"],
        rows: [{
          date: details.expenseDate,
          name: details.expenseCategory,
          amount: details.expenseAmount
        }]
      }]
    };
  
    const API = 'http://localhost:5100/expenses';
    this.http.post(API, data).subscribe(
      (response) => {
        alert('Expense Created Successfully');
        this.expenseForm.reset()
      },
      (error) => {
        console.error('Failed to save expense:', error);
      }
    );
  }  
}
