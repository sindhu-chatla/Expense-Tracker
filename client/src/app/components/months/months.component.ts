import { Component, OnInit, Input } from '@angular/core';
import { MonthToNumberPipe } from 'src/app/Pipes/month-to-number.pipe';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as vfsFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
// import { FileSaverModule } from 'ngx-filesaver';




import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Month, Table, TableRow } from '../models/models';
import { TableDataSourceService } from 'src/app/service/table-data-source.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

(pdfMake as any).vfs = vfsFonts.pdfMake.vfs;

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {
  editRowId: string | null = null;
  exportedMonthDetails: any = null;

  isLoading = false;
  months: any[] = [];
  year: string = '';
  month: string = '';
  newMonth: any = {};
  data: any[] = [];
  tables: any[] = [];
  monthlyExpenses: any[] = [];
  monthlyIncome: any[] = [];

  userName: any = ''

  totalIncome: any = 0;
  totalExpense: any = 0;

  addRowForm!: FormGroup;
  amountControl: FormControl = new FormControl();

  newRow: { date: string, name: string, amount: number } = { date: '', name: '', amount: 0 };


  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router:Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.addRowForm = this.formBuilder.group({
      date: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    });

    this.userName = localStorage.getItem('userName')

    console.log(localStorage.getItem('userId'))

    const token = localStorage.getItem("jwtToken")
    if (!token) {
      window.alert("You can't Access this! because your not an loggedin user!")
      this.router.navigate(['/login'])
    }
    
    const userId = localStorage.getItem('userId')
    this.http.get<any[]>(`http://localhost:5100/expenses/${userId}`).subscribe((data: any[]) => {
      this.months = data;
      console.log(data)
      this.isLoading = false;
      console.log(this.months);
    });
  }


  addMonth() {
    this.newMonth = {
      year: this.year
    };
    this.year = '';
    console.log(this.newMonth);
  }

  addNewRow(formData: any, monthId: string, tableName: string): void {
    const { date, name, amount } = formData;
    console.log(formData)
    const requestBody = {
      formData: { date, name, amount },
      monthId,
      tableName
    };
    this.isLoading = true;
    this.http.post('http://localhost:5100/addRow', requestBody).subscribe(
      (response: any) => {
        this.http.get<any[]>('http://localhost:5100/expenses').subscribe((data: any[]) => {
          this.months = data;
          this.isLoading = false;
          console.log(this.months);
        });
        alert('Row Added Successfully!')
        this.addRowForm.reset();
      },
      (error: any) => {
        console.error('Error adding new row:', error);
      }
    );
  }


  onDeleteRow(expenseId: string, tableName: string, rowId: string) {
    const res = confirm("Are you sure? do you want to delete the row")
    if (res) {
      const API = `http://localhost:5100/expenses/${expenseId}/tables/${tableName}/rows/${rowId}`;
      this.isLoading = true;
      this.http.delete(API).subscribe(
        (response) => {
          alert('Table row deleted successfully');
          this.http.get<any[]>('http://localhost:5100/expenses').subscribe((data: any[]) => {
            this.months = data;
            this.isLoading = false;
            console.log(this.months);
          });
        },
        (error) => {
          console.error('Failed to delete table row:', error);
        }
      );
    }
  }

  submitEditedRow(expenseId: string, tableName: string, rowId: string, row: any) {
    this.isLoading = true;
    const API = `http://localhost:5100/expenses/${expenseId}/tables/${tableName}/rows/${rowId}`;

    this.http.put(API, row).subscribe(
      (response) => {
        alert('Table row updated successfully');
        this.http.get<any[]>('http://localhost:5100/expenses').subscribe((data: any[]) => {
          this.months = data;
          this.isLoading = false;
          console.log(this.months);
        });
        this.editRowId = null;
      },
      (error) => {
        console.error('Failed to update table row:', error);
      }
    );
  }


  exportPdfe(month: any) {
    // Register the pdfMake fonts
  
    // Define the content for the PDF document
    const documentDefinition: any = {
      content: [
        { text: 'Month Details', style: 'header' },
        { text: `Month: ${month.monthNumber}`, style: 'subheader' },
        { text: `Year: ${month.monthYear}`, style: 'subheader' },
        { text: `Total Income: ${month.calculations.totalIncome}`, style: 'subheader' },
        { text: `Total Expense: ${month.calculations.totalExpense}`, style: 'subheader' },
        { text: `Current Savings: ${month.calculations.currentAmount}`, style: 'subheader' },
        // { text: `Current Savingsksjd: ${month.tables.rows[0].amount}`, style: 'subheader' },
        // Add more fields as needed
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] // margin: [left, top, right, bottom]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5] // margin: [left, top, right, bottom]
        }
      }
    };
  
    // Create the PDF document
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  
    // Get the blob data using a callback
    pdfDocGenerator.getBlob((blob: Blob) => {
      // Create a new URL object
      const url = URL.createObjectURL(blob);
  
      // Create a link element and set its attributes
      const link = document.createElement('a');
      link.href = url;
      link.download = 'month_details.pdf';
  
      // Programmatically click the link to trigger the download
      link.click();
  
      // Clean up the URL object
      URL.revokeObjectURL(url);
    });
  }
  
  
  
  
  onDelete(id:any){
    console.log(id)
    this.http.delete(`http://localhost:5100/expenses/${id}`).subscribe((res) => {
      const response = confirm("Are you sure?")
      if(response){
        alert("Month Deleted Successfully!")
      }
      console.log(res)
    })
  }
  
  


}
